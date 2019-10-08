import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';
// import history from 'utils/history';
import { condCheck } from 'shared/services/questionnaire/conditions';
import {
  Content,
  // Overview,
  Answers,
  //  PrefilledAnswerText
} from 'components/Questionnaire';
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

const handleInput = (input, index) => (input.type === 'input' && input.index === index ? input : null);

const handleDecision = (input, index) => (input.index === index ? input : getQuestionFromIndex(input.group, index)[0]);

const handleElement = (elem, index) =>
  elem.type === 'decision' ? handleDecision(elem, index) : handleInput(elem, index);

const getQuestionFromIndex = (elements, index) =>
  elements.filter(e => handleElement(e, index)).map(e => handleElement(e, index));

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
      debug: true,
    };
  }

  componentDidMount() {
    const {
      onFetchQuestionnaire,
      // addressInput: { bestemmingsplanStatus },
    } = this.props;
    // const { debug } = this.state;

    setTimeout(() => {
      // if (!bestemmingsplanStatus || !bestemmingsplanStatus.length || debug) {
      onFetchQuestionnaire([{ text: 'dePijp2018Grouped' }]);
      // } else {
      // onFetchQuestionnaire(bestemmingsplanStatus);
      // }
    }, 3);
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

  onGoToPrev() {
    const {
      questionIndex,
      // userAnswers,
    } = this.state;
    // const { questionnaire } = this.props;
    if (questionIndex < 1) {
      this.setState({
        questionIndex: -1,
      });
    }

    // Check if prev question exists
    // if (getQuestionIdFromIndex(questionIndex - 1, questionnaire)) {
    //   for (let i = 1; i <= questionIndex; i += 1) {
    //     // Loop through answered questions until a question has been answered
    //     if (userAnswers[getQuestionIdFromIndex(questionIndex - i, questionnaire)]) {
    //       this.setState(prevState => ({
    //         questionIndex: prevState.questionIndex - i,
    //       }));
    //     }
    //   }
    // }
  }

  onRandomizeAnswers() {
    const { questionnaire } = this.props;
    const randomAnswers = questionnaire.uitvoeringsregels.reduce((o, key) => {
      const hasConditionAndFailed =
        key.cond && Array.isArray(key.cond) && !condCheck(key.cond, o, questionnaire.uitvoeringsregels);
      const value = !hasConditionAndFailed
        ? key.antwoordOpties[Math.floor(Math.random() * key.antwoordOpties.length)].value
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
    const { questionIndex, userAnswers, debug } = this.state;

    const { questionnaire } = this.props;

    if (!debug) return <div>No Debug</div>;

    const { uitvoeringsregels } = questionnaire;

    if (!uitvoeringsregels) return <div>Geen uitvoeringsregels</div>;
    const question = getQuestionFromIndex(uitvoeringsregels, questionIndex)[0];

    if (question) {
      // QUESTION FLOW FROM JSON
      const {
        id: questionId,
        vraagTekst: questionText,
        antwoordOpties: answers,
        // vergunningplichtig: required,
        cond,
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

      return (
        <StyledContent headingDataId={questionId} heading={questionText} paragraph="">
          <div>ID: {questionId}</div>
          <div>questionIndex: {questionIndex}</div>
          <br />
          <Answers
            questionId={questionId}
            userAnswers={userAnswers}
            answers={answers}
            // required={required}
            action={this.onGoToNext}
          />
          <Navigation showPrev onGoToPrev={this.onGoToPrev} showNext onGoToNext={this.onGoToNext} />
          <p>
            <em>{questionnaire.name}</em>
          </p>
        </StyledContent>
      );
      // return <div id={questionId}>{questionText}</div>;
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
