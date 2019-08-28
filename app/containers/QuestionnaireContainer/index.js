import React from 'react';
import styled from '@datapunt/asc-core';

import { Content, Overview, Answers } from 'components/Questionnaire';
import Navigation from 'components/Navigation';

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

    if (questionIndex > 0 && questionIndex > uitvoeringsregels.length) {
      // OVERVIEW
      QuestionnaireContent = () => (
        <StyledContent heading="Overzicht">
          <Overview
            onGoToQuestion={this.onGoToQuestion}
            userAnswers={userAnswers}
            uitvoeringsregels={uitvoeringsregels}
          />
        </StyledContent>
      );
    } else if (questionIndex > 0 && uitvoeringsregels[questionIndex - 1]) {
      // QUESTION FLOW FROM BACKEND
      const {
        id: questionId,
        vraag: { vraagTekst: question, antwoordOpties: answers },
        content: { toelichting: paragraph },
      } = uitvoeringsregels[questionIndex - 1];

      QuestionnaireContent = () => (
        <StyledContent headingDataId={questionId} heading={question} paragraph={paragraph}>
          <Answers questionId={questionId} userAnswers={userAnswers} answers={answers} onGoToNext={this.onGoToNext} />
          <Navigation showPrev onGoToPrev={this.onGoToPrev} showNext onGoToNext={this.onGoToNext} />
        </StyledContent>
      );
    } else {
      // FIRST QUESTION: LOCATION
      QuestionnaireContent = () => (
        <StyledContent heading="Waar wilt u uw aanbouw maken?">
          <h2>✓ De Pijp</h2>
          <p>Straks kunt u hier een locatie kiezen, nu wordt de vragenlijst van De Pijp laten zien.</p>
          <Navigation onGoToNext={this.onGoToNext} showNext />
        </StyledContent>
      );
    }

    return <QuestionnaireContent />;
  }
}

export default QuestionnaireContainer;
