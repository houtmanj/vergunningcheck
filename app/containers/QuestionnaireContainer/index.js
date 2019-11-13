import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import history from 'utils/history';
import { Paragraph, Heading } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

import { condCheck, areAllCondTrue } from 'shared/services/questionnaire/conditions';
import { Overview, Question } from 'components/Questionnaire';
import { fetchQuestionnaire } from './actions';

const StyledContent = styled(`div`)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const getQuestionIdFromIndex = (index, questionnaire) =>
  questionnaire.uitvoeringsregels[index] ? questionnaire.uitvoeringsregels[index].id : null;

class QuestionnaireContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onGoToQuestion = this.onGoToQuestion.bind(this);
    this.onGoToNext = this.onGoToNext.bind(this);
    this.onGoToPrev = this.onGoToPrev.bind(this);
    this.setBestemmingsplan = this.setBestemmingsplan.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      questionIndex: 0,
      userAnswers: {},
      hasBestemmingsplan: false,
    };
  }

  componentDidMount() {
    const {
      onFetchQuestionnaire,
      addressInput: { bestemmingsplanStatus },
    } = this.props;

    if (bestemmingsplanStatus && bestemmingsplanStatus.length) {
      onFetchQuestionnaire(bestemmingsplanStatus);
      this.setState({
        hasBestemmingsplan: true,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
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

    this.setState({
      hasBestemmingsplan: true,
    });
    onFetchQuestionnaire([{ text: bestemmingsplan }]);
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

  render() {
    const { questionIndex, userAnswers, hasBestemmingsplan } = this.state;

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
      return (
        <StyledContent>
          <Heading $as="h3">Laden...</Heading>
          <Paragraph>Gegevens ophalen</Paragraph>
        </StyledContent>
      );
    }

    if (error) {
      return <div>Helaas is er iets mis gegaan met het ophalen van de vragenlijsten, probeer het nog eens.</div>;
    }

    if (!hasBestemmingsplan) {
      return (
        <Question
          questionId="bestemmingsplan"
          heading="Er is geen bestemmingsplan gevonden. Welk bestemmingsplan wilt u gebruiken?"
          paragraph="Kies een bestemmingsplan waar u mee wilt werken."
          onSubmit={this.setBestemmingsplan}
          onGoToPrev={this.onGoToPrev}
          showNext
          showPrev
          required
          answers={[
            {
              id: 1,
              value: 'dePijp2018',
              optieText: 'De Pijp',
            },
            {
              id: 2,
              value: 'test',
              optieText: 'Plaatjes',
            },
          ]}
        />
      );
    }

    const { uitvoeringsregels } = questionnaire;

    if (!uitvoeringsregels) {
      return <div>Helaas zijn er geen vragenlijsten gevonden op deze locatie: {userAddress}</div>;
    }

    const question = uitvoeringsregels[questionIndex];

    if (question) {
      // QUESTION FLOW FROM JSON
      const {
        id: questionId,
        vraagTekst: questionText,
        antwoordOpties: answers,
        cond,
        media,
        type,
        toelichting: paragraph,
        langeToelichting: modalText,
        registerbevraging: registryQuestion,
      } = question;

      // CONDITIONALS
      // @TODO: Need to move out of the render()
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

      const hasRegistry = !!registryQuestion;
      const setAnswer = !!(registryQuestion === 'monument' && monumentStatus !== '');

      return (
        <Question
          heading={questionText}
          paragraph={paragraph}
          modalText={modalText}
          onSubmit={this.onGoToNext}
          onGoToPrev={this.onGoToPrev}
          questionId={questionId}
          userAnswers={userAnswers}
          media={media}
          answers={answers}
          hasRegistry={hasRegistry}
          setAnswer={setAnswer}
          required
          showNext
          showPrev
        />
      );
    }

    if (questionIndex >= uitvoeringsregels.length) {
      // OVERVIEW
      return (
        <StyledContent>
          <Heading $as="h3">Controleer uw antwoorden</Heading>
          <Paragraph>Adres: {userAddress}</Paragraph>
          <Paragraph>
            Uitkomst:{' '}
            <strong>
              {questionnaire.uitkomsten.map(uitkomst =>
                areAllCondTrue(uitkomst.cond, userAnswers, questionnaire.uitvoeringsregels) ? uitkomst.label : null,
              )}
            </strong>
          </Paragraph>
          <Paragraph>
            Hieronder ziet u uw antwoorden terug. U kunt uw antwoorden eenvoudig wijzigen. Als u op volgende klikt, ziet
            u wat de vervolgstappen zijn.
          </Paragraph>
          <Overview
            onGoToQuestion={this.onGoToQuestion}
            userAnswers={userAnswers}
            uitvoeringsregels={uitvoeringsregels}
          />
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
