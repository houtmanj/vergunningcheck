import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';
import history from 'utils/history';

import { condCheck, areAllCondTrue } from 'shared/services/questionnaire/conditions';
import { Content, Overview, Answers, PrefilledAnswerText } from 'components/Questionnaire';
import Navigation from 'components/Navigation';
import { fetchQuestionnaire } from './actions';

const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const RandomizeButton = props => (
  <button type="submit" onClick={props.randomizeAnswers()}>
    Randomize
  </button>
);
RandomizeButton.propTypes = {
  randomizeAnswers: PropTypes.func,
};

const getQuestionIdFromIndex = (index, questionnaire) =>
  questionnaire.uitvoeringsregels[index] ? questionnaire.uitvoeringsregels[index].id : null;

class QuestionnaireContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onGoToQuestion = this.onGoToQuestion.bind(this);
    this.onGoToNext = this.onGoToNext.bind(this);
    this.onGoToPrev = this.onGoToPrev.bind(this);
    this.onRandomizeAnswers = this.onRandomizeAnswers.bind(this);

    this.state = {
      questionIndex: 0,
      userAnswers: {},
    };
  }

  componentDidMount() {
    const {
      onFetchQuestionnaire,
      addressInput: { bestemmingsplanStatus },
    } = this.props;
    onFetchQuestionnaire(bestemmingsplanStatus);
  }

  onGoToQuestion(questionId) {
    const { questionnaire } = this.props;
    let questionIndex = 0;
    // Used for() instead of findIndex(), because of https://stackoverflow.com/a/15998003
    for (let i = 0; i < questionnaire.uitvoeringsregels.length; i += 1) {
      if (questionnaire.uitvoeringsregels[i].id === questionId) {
        questionIndex = i;
        break;
      }
    }
    this.setState({
      questionIndex,
    });
  }

  onGoToNext(questionId, answerId) {
    // const { userAnswers } = this.state;
    // console.log('userAnswers:');
    // console.log({
    //   ...userAnswers,
    //   [questionId]: answerId,
    // });
    this.setState(prevState => ({
      questionIndex: prevState.questionIndex + 1,
      userAnswers: {
        ...prevState.userAnswers,
        [questionId]: answerId,
      },
    }));
  }

  onGoToPrev() {
    const { questionIndex, userAnswers } = this.state;
    const { questionnaire } = this.props;
    if (questionIndex < 1) {
      this.setState({
        questionIndex: -1,
      });
    }

    // Check if prev question exists
    if (getQuestionIdFromIndex(questionIndex - 1, questionnaire)) {
      for (let i = 1; i <= questionIndex; i += 1) {
        // Loop through answered questions until a question has been answered
        if (userAnswers[getQuestionIdFromIndex(questionIndex - i, questionnaire)]) {
          this.setState(prevState => ({
            questionIndex: prevState.questionIndex - i,
          }));
        }
      }
    }
  }

  onRandomizeAnswers() {
    const { questionnaire } = this.props;
    const randomAnswers = questionnaire.uitvoeringsregels.reduce((o, key) => {
      const hasConditionAndFailed =
        key.cond && Array.isArray(key.cond) && !condCheck(key.cond, o, questionnaire.uitvoeringsregels);
      const value = !hasConditionAndFailed
        ? key.vraag.antwoordOpties[Math.floor(Math.random() * key.vraag.antwoordOpties.length)].id
        : null;
      return {
        ...o,
        [key.id]: value,
      };
    }, {});

    this.setState({
      questionIndex: questionnaire.uitvoeringsregels.length,
      userAnswers: {
        ...randomAnswers,
      },
    });
  }

  render() {
    const { questionIndex, userAnswers } = this.state;

    const {
      questionnaire,
      loading,
      error,
      addressInput: {
        bagStatus: { _display: userAddress = '' },
      },
    } = this.props;

    if (loading) {
      return <StyledContent heading="Laden..." paragraph="Gegevens ophalen" />;
    }

    if (!userAddress || questionIndex < 0) {
      // Return to Location page if no address is in state
      history.push('/aanbouw/locatie');
      return null;
    }

    const { uitvoeringsregels } = questionnaire;

    if (!uitvoeringsregels) {
      return <div>Helaas zijn er geen vragenlijsten gevonden op deze locatie: {userAddress}</div>;
    }
    if (error) {
      return <div>Helaas is er iets mis gegaan met het ophalen van de vragenlijsten, probeer het nog eens.</div>;
    }

    if (uitvoeringsregels[questionIndex]) {
      // QUESTION FLOW FROM JSON
      const {
        id: questionId,
        vraag: { vraagTekst: question, antwoordOpties: answers, vergunningplichtig: required },
        // content: { toelichting: paragraph = 'demo' },
        cond,
      } = uitvoeringsregels[questionIndex];

      const paragraph = ''; // fake text

      // CONDITIONALS
      if (cond && Array.isArray(cond)) {
        // This question has condition(s)

        const isTrue = condCheck(cond, userAnswers, questionnaire.uitvoeringsregels);

        if (!isTrue) {
          // the conditions are not true, so skip this question
          this.onGoToNext(questionId, null);
        }
      }

      const hasPrefilledAnswer = answers.filter(answer => answer.prefilled).length > 0;

      return (
        <StyledContent headingDataId={questionId} heading={question} paragraph={paragraph}>
          {hasPrefilledAnswer && <PrefilledAnswerText />}
          <Answers
            questionId={questionId}
            userAnswers={userAnswers}
            answers={answers}
            required={required}
            action={this.onGoToNext}
          />
          <Navigation showPrev onGoToPrev={this.onGoToPrev} showNext onGoToNext={this.onGoToNext} />
          <RandomizeButton randomizeAnswers={() => this.onRandomizeAnswers} />
        </StyledContent>
      );
    }

    if (questionIndex >= uitvoeringsregels.length) {
      // OVERVIEW
      return (
        <StyledContent heading="Controleer uw antwoorden">
          <p>Adres: {userAddress}</p>
          <p>
            {' '}
            Uitkomst:{' '}
            <strong>
              {questionnaire.uitkomsten.map(uitkomst =>
                areAllCondTrue(uitkomst.cond, userAnswers, questionnaire.uitvoeringsregels) ? uitkomst.label : null,
              )}
            </strong>
          </p>
          <p>
            Hieronder ziet u uw antwoorden terug. U kunt uw antwoorden eenvoudig wijzigen. Als u op volgende klikt, ziet
            u wat de vervolgstappen zijn.
          </p>
          <Overview
            onGoToQuestion={this.onGoToQuestion}
            userAnswers={userAnswers}
            uitvoeringsregels={uitvoeringsregels}
          />
          <Navigation />
          <RandomizeButton randomizeAnswers={() => this.onRandomizeAnswers} />
        </StyledContent>
      );
    }

    return null;
  }
}

QuestionnaireContainer.defaultProps = {
  addressInput: {
    bestemmingsplanStatus: [],
  },
};

QuestionnaireContainer.propTypes = {
  onFetchQuestionnaire: PropTypes.func.isRequired,
  addressInput: PropTypes.shape({
    bestemmingsplanStatus: PropTypes.array,
  }),
  questionnaire: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

const mapStateToProps = state => {
  const {
    addressInput,
    questionnaire: { loading, error, questionnaire },
  } = state;
  return { addressInput, questionnaire, error, loading };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onFetchQuestionnaire: fetchQuestionnaire,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionnaireContainer);
