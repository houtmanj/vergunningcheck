import React from 'react';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';

import { Content, Overview, Answers, PrefilledAnswerText } from 'components/Questionnaire';
import Navigation from 'components/Navigation';

import config from './config';

const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledAnswers = styled(Answers)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RandomizeButton = props => (
  <button type="submit" onClick={props.randomizeAnswers()}>
    Randomize
  </button>
);
RandomizeButton.propTypes = {
  randomizeAnswers: PropTypes.func,
};

class QuestionnaireContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onGoToQuestion = this.onGoToQuestion.bind(this);
    this.onGoToNext = this.onGoToNext.bind(this);
    this.onGoToPrev = this.onGoToPrev.bind(this);
    this.onRandomizeAnswers = this.onRandomizeAnswers.bind(this);

    this.state = {
      debug: {
        defaultLocation: 'de pijp',
      },
      location: false,
      questionIndex: -1,
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

  setLocation(location) {
    this.setState({
      location,
      questionIndex: 0,
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
    // Check if question might be skipped by Cond
    this.setState(prevState => ({
      questionIndex: prevState.questionIndex - 1,
    }));
  }

  onRandomizeAnswers() {
    const randomAnswers = config.uitvoeringsregels.reduce(
      (o, key) => ({
        ...o,
        [key.id]: key.vraag.antwoordOpties[Math.floor(Math.random() * key.vraag.antwoordOpties.length)].id,
      }),
      {},
    );

    this.setLocation('de pijp');

    this.setState(prevState => ({
      questionIndex: config.uitvoeringsregels.length,
      userAnswers: {
        ...randomAnswers,
        ...prevState.userAnswers,
      },
    }));
  }

  render() {
    const { questionIndex, userAnswers, location, debug } = this.state;

    if (debug) {
      // Debug > Set default location
      if (debug.defaultLocation && !location) {
        this.setLocation('de pijp');
      }
    }

    if (!location || questionIndex < 0) {
      // FIRST QUESTION: LOCATION
      return (
        <StyledContent heading="Waar wilt u uw aanbouw maken?">
          <h2>✓ De Pijp</h2>
          <p>Straks kunt u hier een locatie kiezen, nu wordt de vragenlijst van De Pijp laten zien.</p>
          <Navigation onGoToNext={() => this.setLocation('de pijp')} showNext />
          <RandomizeButton randomizeAnswers={() => this.onRandomizeAnswers} />
        </StyledContent>
      );
    }

    const { uitvoeringsregels } = config;

    if (uitvoeringsregels[questionIndex]) {
      // QUESTION FLOW FROM JSON
      const {
        id: questionId,
        vraag: { vraagTekst: question, antwoordOpties: answers, vergunningplichtig: required },
        content: { toelichting: paragraph },
        cond,
      } = uitvoeringsregels[questionIndex];

      // CONDITIONALS
      if (cond && Array.isArray(cond)) {
        // This question has condition(s)
        const condTrue = cond.some(condition => {
          const conditionQuestion = condition.split('.')[0];
          const conditionAnswerText = condition
            .split('.')[1]
            .toLowerCase()
            .replace(/['"]+/g, '');

          const conditionQuestionData = uitvoeringsregels.filter(q => q.id === conditionQuestion);
          // if conditionQuestion exists is datafile && user has already answered
          if (conditionQuestionData.length === 1 && userAnswers[conditionQuestion]) {
            const userAnswerId = userAnswers[conditionQuestion];

            const userAnswer = conditionQuestionData[0].vraag.antwoordOpties
              .filter(antwoord => antwoord.id === userAnswerId)
              .map(antwoord => antwoord.optieText);
            const userAnswerText = userAnswer.toString().toLowerCase();

            // if conditionAnswer is the same as answeredQuestion
            if (conditionAnswerText === userAnswerText) {
              return true;
            }
          }
          return false;
        });

        if (!condTrue) {
          // the conditions are not true, so skip this question
          this.onGoToNext(questionId, null);
        }
      }

      const hasPrefilledAnswer = answers.filter(answer => answer.prefilled).length > 0;

      return (
        <StyledContent headingDataId={questionId} heading={question} paragraph={paragraph}>
          {hasPrefilledAnswer && <PrefilledAnswerText />}
          <StyledAnswers
            questionId={questionId}
            userAnswers={userAnswers}
            answers={answers}
            required={required}
            onGoToNext={this.onGoToNext}
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
          <p>
            Op grond van uw antwoorden heeft u geen omgevingsvergunning voor bouw en gebruik nodig. Hieronder ziet u uw
            antwoorden terug.
          </p>
          <p>U kunt uw antwoorden eenvoudig wijzigen. Als u op volgende klikt, ziet u wat de vervolgstappen zijn.</p>
          <Overview
            onGoToQuestion={this.onGoToQuestion}
            userAnswers={userAnswers}
            uitvoeringsregels={uitvoeringsregels}
          />
          <Navigation />
        </StyledContent>
      );
    }

    return null;
  }
}

export default QuestionnaireContainer;
