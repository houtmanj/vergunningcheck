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

    {uitvoeringsregels.map((regel, index) => {
      // if (regel.type === 'decision') return null;
      const userAnswerValue = userAnswers[regel.id];
      const userAnswer = regel.antwoordOpties
        .filter(antwoord => antwoord.value === userAnswerValue)
        .map(antwoord => antwoord.optieText);

      const answerText = userAnswer.toString();

      if (!answerText) {
        return null;
      }

      // const required = regel.vergunningplichtig;
      // const resultText = requiredText === answerText ? `⚠️` : `✅`;

      return (
        <Wrapper key={regel.id}>
          <Question key={regel.vraagTekst}>
            {index + 1}: {regel.vraagTekst}
            <p>
              <em>
                {index + 1}: {regel.id}
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
            <button onClick={() => onGoToQuestion(regel.id)} type="button" href="#" key={regel.id}>
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
