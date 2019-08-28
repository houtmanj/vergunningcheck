import React from 'react';
import styled from '@datapunt/asc-core';
import { Row, Column } from '@datapunt/asc-ui';

import { Content, Conclusion, Introduction, Answers, QuestionFooter } from 'components/Questionnaire';

import config from './config';

const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

class QuestionnaireContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onGoToQuestion = this.onGoToQuestion.bind(this);
    this.onGoToNext = this.onGoToNext.bind(this);
    this.onGoToPrev = this.onGoToPrev.bind(this);

    this.state = {
      questionIndex: 0,
      userAnswers: {},
    };
  }

  onGoToQuestion(questionId) {
    let questionIndex = 0;
    // Used for() instead of findIndex(), because of https://stackoverflow.com/a/15998003
    for (let i = 0; i < config.uitvoeringsregels.length; i += 1) {
      if (config.uitvoeringsregels[i].id === questionId) {
        questionIndex = i;
        break;
      }
    }
    this.setState({
      questionIndex,
    });
  }

  onGoToNext(questionId, answerId) {
    this.setState(prevState => ({
      questionIndex: prevState.questionIndex + 1,
      userAnswers: {
        ...prevState.userAnswers,
        [questionId]: answerId,
      },
    }));
  }

  onGoToPrev() {
    this.setState(prevState => ({
      questionIndex: prevState.questionIndex - 1,
    }));
  }

  render() {
    const { questionIndex, userAnswers } = this.state;
    // console.log(userAnswers);

    const { uitvoeringsregels } = config;

    let QuestionnaireContent;

    if (questionIndex > 0 && questionIndex >= uitvoeringsregels.length) {
      // CONCLUSION
      QuestionnaireContent = () => (
        <StyledContent heading="Overzicht">
          <Conclusion
            onGoToQuestion={this.onGoToQuestion}
            userAnswers={userAnswers}
            uitvoeringsregels={uitvoeringsregels}
          />
        </StyledContent>
      );
    } else if (questionIndex > 0 && uitvoeringsregels[questionIndex]) {
      // QUESTION
      const {
        id: questionId,
        vraag: { vraagTekst: question, antwoordOpties: answers },
        content: { toelichting: paragraph },
      } = uitvoeringsregels[questionIndex];

      QuestionnaireContent = () => (
        <StyledContent headingDataId={questionId} heading={question} paragraph={paragraph}>
          <Answers questionId={questionId} userAnswers={userAnswers} answers={answers} onGoToNext={this.onGoToNext} />
          <QuestionFooter showPrev onGoToPrev={this.onGoToPrev} showNext onGoToNext={this.onGoToNext} />
        </StyledContent>
      );
    } else {
      // INTRODUCTION
      QuestionnaireContent = () => (
        <StyledContent heading="Inleiding">
          <Introduction />
          <QuestionFooter onGoToNext={this.onGoToNext} showNext />
        </StyledContent>
      );
    }

    return (
      <Row halign="center" valign="center">
        <Column wrap alignSelf="flex-start" span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <QuestionnaireContent />
        </Column>
      </Row>
    );
  }
}

export default QuestionnaireContainer;
