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

const Change = styled(`div`)`
  width: 60px;
`;

const QuestionAnswers = ({ questions, userAnswers, onGoToQuestion }) => (
  <>
    <MainWrapper>
      <Question>Vraag</Question>
      <UserAnswer>Uw antwoord</UserAnswer>
      <Change>Wijzig</Change>
    </MainWrapper>

    {questions.map((rule, index) => {
      const userAnswerValue = userAnswers[rule.id];
      const userAnswer = rule.antwoordOpties
        .filter(answer => answer.value === userAnswerValue)
        .map(answer => answer.optieText);

      const answerText = userAnswer.toString();

      if (!answerText) {
        return null;
      }

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

QuestionAnswers.propTypes = {
  onGoToQuestion: PropTypes.func,
  questions: PropTypes.array,
  userAnswers: PropTypes.object,
};

export default QuestionAnswers;
