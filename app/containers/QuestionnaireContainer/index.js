import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import history from 'utils/history';
import { Paragraph, Heading } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

import { condCheck } from 'shared/services/questionnaire/conditions';
import { Question, QuestionOverview } from 'components/Questionnaire';
import { GET_CURRENT_TOPIC, PAGES } from '../../constants';
import { fetchQuestionnaire } from './actions';

const StyledContent = styled(`div`)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const getQuestionIdFromIndex = (index, questionnaire) =>
  index >= 0 && questionnaire?.uitvoeringsregels[index] ? questionnaire.uitvoeringsregels[index].id : null;

class QuestionnaireContainer extends React.Component {
  state = {
    questionIndex: 0,
    userAnswers: {},
    hasBestemmingsplan: false,
  };

  componentDidMount() {
    const {
      onFetchQuestionnaire,
      locationData: { bestemmingsplanStatus },
    } = this.props;

    if (bestemmingsplanStatus && bestemmingsplanStatus.length) {
      onFetchQuestionnaire(bestemmingsplanStatus);
      this.setState({
        hasBestemmingsplan: true,
      });
    }
  }

  onGoToQuestion = questionId => {
    const {
      questionnaire: { uitvoeringsregels: questions },
    } = this.props;
    let questionIndex = 0;
    // Used for() instead of findIndex(), because of https://stackoverflow.com/a/15998003
    for (let i = 0; i < questions.length; i += 1) {
      if (questions[i].id === questionId) {
        questionIndex = i;
        break;
      }
    }
    this.setState({
      questionIndex,
    });
  };

  onGoToNext = (questionId, value) => {
    this.setState(prevState => ({
      questionIndex: prevState.questionIndex + 1,
      userAnswers: {
        ...prevState.userAnswers,
        [questionId]: value,
      },
    }));
  };

  setBestemmingsplan = (questionId, bestemmingsplan) => {
    const { onFetchQuestionnaire } = this.props;

    this.setState({
      hasBestemmingsplan: true,
    });

    onFetchQuestionnaire([{ text: bestemmingsplan }]);
  };

  onGoToPrev = e => {
    e.preventDefault();
    const { questionIndex, userAnswers } = this.state;
    const { questionnaire } = this.props;

    if (questionIndex < 1) {
      // Return to location question
      history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.location}`);
      return;
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
  };

  render() {
    const { questionIndex, userAnswers, hasBestemmingsplan } = this.state;
    const {
      questionnaire: { uitkomsten: output, uitvoeringsregels: questions },
      loading,
      error,
    } = this.props;

    const userAddress = this.props.locationData?.bagStatus?._display;

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
      const question = {
        id: 'bestemmingsplan',
        vraagTekst: 'Er is geen bestemmingsplan gevonden. Welk bestemmingsplan wilt u gebruiken?',
        toelichting: 'Kies een bestemmingsplan waar u mee wilt werken.',
        antwoordOpties: [
          {
            id: 1,
            value: 'dePijp2018',
            optieText: 'De Pijp',
          },
          {
            id: 2,
            value: 'media',
            optieText: 'Plaatjes',
          },
        ],
      };

      return (
        <Question
          question={question}
          onSubmit={this.setBestemmingsplan}
          onGoToPrev={this.onGoToPrev}
          showNext
          showPrev
          required
        />
      );
    }

    if (!questions) {
      return <div>Helaas zijn er geen vragenlijsten gevonden op deze locatie: {userAddress}</div>;
    }

    const question = questions[questionIndex];

    if (question) {
      // QUESTION FLOW FROM JSON
      const { id: questionId, antwoordOpties: answers, cond, type } = question;

      // CONDITIONALS
      // @TODO: Need to move out of the render()
      if (cond && Array.isArray(cond)) {
        // This question has condition(s)
        const isTrue = condCheck(cond, userAnswers, questions);

        if (!isTrue) {
          // the conditions are not true, so skip this question
          this.onGoToNext(questionId, null);
        }
      }
      if (type === 'decision') {
        answers.filter(answer => {
          if (answer.cond) {
            const isTrue = condCheck(answer.cond, userAnswers, questions);
            if (isTrue) {
              this.onGoToNext(questionId, answer.value);
              return null;
            }
          }
          return answer;
        });
      }
      return (
        <Question
          onSubmit={this.onGoToNext}
          onGoToPrev={this.onGoToPrev}
          question={question}
          userAnswers={userAnswers}
          required
          showNext
          showPrev
        />
      );
    }

    if (questionIndex >= questions.length) {
      // OVERVIEW
      return (
        <QuestionOverview
          onGoToQuestion={this.onGoToQuestion}
          userAddress={userAddress}
          output={output}
          userAnswers={userAnswers}
          questions={questions}
        />
      );
    }

    return null;
  }
}

QuestionnaireContainer.defaultProps = {
  locationData: {
    bestemmingsplanStatus: [],
  },
};

QuestionnaireContainer.propTypes = {
  onFetchQuestionnaire: PropTypes.func.isRequired,
  locationData: PropTypes.shape({
    bagStatus: PropTypes.object,
    bestemmingsplanStatus: PropTypes.array,
  }),
  questionnaire: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

const mapStateToProps = state => {
  const {
    locationData,
    questionnaire: { loading, error, questionnaire },
  } = state;
  return { locationData, questionnaire, error, loading };
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
