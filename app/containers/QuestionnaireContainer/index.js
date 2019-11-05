import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import history from 'utils/history';
import styled from '@datapunt/asc-core';

import { condCheck, areAllCondTrue } from 'shared/services/questionnaire/conditions';
import {
  Content,
  Overview,
  Question,
  Answers,
  PrefilledAnswerText,
  // ImageContainer,
} from 'components/Questionnaire';
import Navigation from 'components/Navigation';
import { fetchQuestionnaire } from './actions';

const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

// const RandomizeButton = props => (
//   <button type="submit" onClick={props.randomizeAnswers()}>
//     Randomize
//   </button>
// );
// RandomizeButton.propTypes = {
//   randomizeAnswers: PropTypes.func,
// };

const getQuestionIdFromIndex = (index, questionnaire) =>
  questionnaire.uitvoeringsregels[index] ? questionnaire.uitvoeringsregels[index].id : null;

class QuestionnaireContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onGoToQuestion = this.onGoToQuestion.bind(this);
    this.onGoToNext = this.onGoToNext.bind(this);
    this.onGoToPrev = this.onGoToPrev.bind(this);
    this.setBestemmingsplan = this.setBestemmingsplan.bind(this);
    // this.onRandomizeAnswers = this.onRandomizeAnswers.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      questionIndex: 0,
      userAnswers: {},
      debug: false,
      hasBestemmingsplan: false,
    };
  }

  componentDidMount() {
    const {
      onFetchQuestionnaire,
      addressInput: { bestemmingsplanStatus },
    } = this.props;
    const { debug } = this.state;

    setTimeout(() => {
      if (!bestemmingsplanStatus || !bestemmingsplanStatus.length || debug) {
        onFetchQuestionnaire([{ text: 'test' }]);
      } else {
        onFetchQuestionnaire(bestemmingsplanStatus);
        this.setState({
          hasBestemmingsplan: true,
        });
      }
    }, 3);
  }

  handleSubmit(e) {
    e.preventDefault();

    // const data = new FormData(e.target);
  }

  handleChange() {
    // this.setState({value: event.target.value});
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

  onGoToNext(questionId, value) {
    // const { userAnswers } = this.state;
    // console.log('userAnswers:');
    // console.log({
    //   ...userAnswers,
    //   [questionId]: value,
    // });
    this.setState(prevState => ({
      questionIndex: prevState.questionIndex + 1,
      userAnswers: {
        ...prevState.userAnswers,
        [questionId]: value,
      },
    }));
  }

  setBestemmingsplan(questionId, bestemmingsplan) {
    const { onFetchQuestionnaire } = this.props;

    onFetchQuestionnaire([{ text: bestemmingsplan }]);
    this.setState({
      hasBestemmingsplan: true,
    });
  }

  onGoToPrev() {
    const { questionIndex, userAnswers } = this.state;
    const { questionnaire } = this.props;
    if (questionIndex < 1) {
      // Return to location question
      history.push('/aanbouw/locatie');
    }
    // Check if prev question exists
    if (getQuestionIdFromIndex(questionIndex - 1, questionnaire)) {
      for (let i = 1; i <= questionIndex; i += 1) {
        // Loop through answered questions until a question has been answered
        if (userAnswers[getQuestionIdFromIndex(questionIndex - i, questionnaire)]) {
          this.setState(prevState => ({
            questionIndex: prevState.questionIndex - i,
          }));
          // End loop if prev question has been set
          break;
        }
      }
    }
  }

  // onRandomizeAnswers() {
  //   const { questionnaire } = this.props;
  //   const randomAnswers = questionnaire.uitvoeringsregels.reduce((o, key) => {
  //     const hasConditionAndFailed =
  //       key.cond && Array.isArray(key.cond) && !condCheck(key.cond, o, questionnaire.uitvoeringsregels);
  //     const value = !hasConditionAndFailed
  //       ? key.antwoordOpties[Math.floor(Math.random() * key.antwoordOpties.length)].value
  //       : null;
  //     return {
  //       ...o,
  //       [key.id]: value,
  //     };
  //   }, {});

  //   this.setState({
  //     questionIndex: questionnaire.uitvoeringsregels.length,
  //     userAnswers: {
  //       ...randomAnswers,
  //     },
  //   });
  // }

  render() {
    const {
      questionIndex,
      userAnswers,
      // debug,
      hasBestemmingsplan,
    } = this.state;

    const {
      questionnaire,
      loading,
      error,
      addressInput: {
        bagStatus: { _display: userAddress = '' },
        monumentStatus,
      },
    } = this.props;

    if (loading) {
      return <StyledContent heading="Laden..." paragraph="Gegevens ophalen" />;
    }

    if (loading) {
      return <StyledContent heading="Laden..." paragraph="Gegevens ophalen" />;
    }

    if (!hasBestemmingsplan) {
      return (
        <Question
          heading="Er is geen bestemmingsplan gevonden. Welk bestemmingsplan wilt u gebruiken?"
          paragraph="Kies een bestemmingsplan waar u mee wilt werken."
          onSubmit={this.handleSubmit}
        >
          {/* <ImageContainer /> */}
          <Answers
            questionId="bestemmingsplan"
            answers={[
              {
                id: 1,
                value: 'dePijp2018',
                optieText: 'De Pijp',
              },
              {
                id: 2,
                value: 'rivierenbuurt',
                optieText: 'Rivierenbuurt',
              },
            ]}
            action={this.setBestemmingsplan}
          />
          <Navigation showPrev onGoToPrev={this.onGoToPrev} showNext onGoToNext={this.setBestemmingsplan} disableNext />
          <p>
            <em>{questionnaire.name}</em>
          </p>
          {/* <RandomizeButton randomizeAnswers={() => this.onRandomizeAnswers} /> */}
        </Question>
      );
    }

    const { uitvoeringsregels } = questionnaire;

    if (!uitvoeringsregels) {
      return <div>Helaas zijn er geen vragenlijsten gevonden op deze locatie: {userAddress}</div>;
    }

    if (error) {
      return <div>Helaas is er iets mis gegaan met het ophalen van de vragenlijsten, probeer het nog eens.</div>;
    }

    const question = uitvoeringsregels[questionIndex];

    if (question) {
      // QUESTION FLOW FROM JSON
      const {
        id: questionId,
        vraagTekst: questionText,
        antwoordOpties: answers,
        vergunningplichtig: required,
        cond,
        type,
        toelichting: paragraph,
        langeToelichting: modalText,
        registerbevraging: registryQuestion,
      } = question;

      // CONDITIONALS
      if (cond && Array.isArray(cond)) {
        // This question has condition(s)

        const isTrue = condCheck(cond, userAnswers, questionnaire.uitvoeringsregels);

        if (!isTrue) {
          // the conditions are not true, so skip this question
          this.onGoToNext(questionId, null);
        }
      }
      if (type === 'decision') {
        answers.filter(a => {
          if (a.cond) {
            const isTrue = condCheck(a.cond, userAnswers, questionnaire.uitvoeringsregels);
            if (isTrue) {
              this.onGoToNext(questionId, a.value);
              return null;
            }
          }
          return a;
        });
      }

      const hasPrefilledAnswer = answers.filter(answer => answer.prefilled).length > 0;
      const hasRegistry = !!registryQuestion;
      const setAnswer = !!(registryQuestion === 'monument' && monumentStatus !== '');

      return (
        <Question heading={questionText} paragraph={paragraph} modalText={modalText} onSubmit={this.handleSubmit}>
          {/* <div>ID: {questionId}</div> */}
          {/* <div>questionIndex: {questionIndex}</div> */}
          <br />
          {hasPrefilledAnswer && <PrefilledAnswerText />}
          <Answers
            questionId={questionId}
            userAnswers={userAnswers}
            answers={answers}
            required={required}
            hasRegistry={hasRegistry}
            setAnswer={setAnswer}
            action={this.onGoToNext}
          />
          <Navigation
            showPrev
            onGoToPrev={this.onGoToPrev}
            showNext
            disableNext
            // onGoToNext={this.onGoToNext}
          />
          <p>
            <em>{questionnaire.name}</em>
          </p>
          {/* <RandomizeButton randomizeAnswers={() => this.onRandomizeAnswers} /> */}
        </Question>
      );
    }

    if (questionIndex >= uitvoeringsregels.length) {
      // OVERVIEW
      return (
        <StyledContent heading="Controleer uw antwoorden">
          <p>Adres: {userAddress}</p>
          <p>
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
          {/* <RandomizeButton randomizeAnswers={() => this.onRandomizeAnswers} /> */}
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
