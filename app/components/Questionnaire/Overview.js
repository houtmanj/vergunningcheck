import React from 'react';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';

const Wrapper = styled(`div`)`
  display: flex;
  width: 100%;
  padding: 7px 0 7px;
  justify-content: space-between;
  border-top: 1px solid black;
`;
const MainWrapper = styled(Wrapper)`
  font-weight: 700;
`;
const Question = styled(`div`)`
  width: 60%;
`;
const UserAnswer = styled(`div`)`
  width: 100px;
`;
// const Result = styled(`div`)`
//   width: 150px;
// `;
const Change = styled(`div`)`
  width: 60px;
`;

const Overview = ({ uitvoeringsregels, userAnswers, onGoToQuestion }) => (
  <>
    <MainWrapper>
      <Question>Vraag</Question>
      <UserAnswer>Uw antwoord</UserAnswer>
      {/* <Result>Vergunningsplichtig?</Result> */}
      <Change>Wijzig</Change>
    </MainWrapper>

    {uitvoeringsregels.map((rule, index) => {
      // if (rule.type === 'decision') return null;
      const userAnswerValue = userAnswers[rule.id];
      const userAnswer = rule.antwoordOpties
        .filter(antwoord => antwoord.value === userAnswerValue)
        .map(antwoord => antwoord.optieText);

      const answerText = userAnswer.toString();

      if (!answerText) {
        return null;
      }

      // const required = rule.vergunningplichtig;
      // const resultText = requiredText === answerText ? `⚠️` : `✅`;

      return (
        <Wrapper key={rule.id}>
          <Question key={rule.vraagTekst}>
            {rule.vraagTekst}
            <br />
            {rule.toelichting && rule.toelichting}
            <p>
              <em>
                {index + 1}: {rule.id}
              </em>
            </p>
          </Question>
          <UserAnswer key={userAnswer}>
            {answerText}
            <p>
              <em>{userAnswerValue}</em>
            </p>
          </UserAnswer>
          {/* <Result key={resultText}>{resultText}</Result> */}
          <Change>
            <button onClick={() => onGoToQuestion(rule.id)} type="button" href="#" key={rule.id}>
              Wijzig
            </button>
          </Change>
        </Wrapper>
      );
    })}
  </>
);

Overview.propTypes = {
  onGoToQuestion: PropTypes.func,
  uitvoeringsregels: PropTypes.array,
  userAnswers: PropTypes.object,
};

export default Overview;
