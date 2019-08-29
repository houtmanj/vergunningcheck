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
  width: 70%;
`;
const Answer = styled(`div`)`
  width: 100px;
`;
const Change = styled(`div`)`
  width: 60px;
`;

const Overview = ({ uitvoeringsregels, userAnswers, onGoToQuestion }) => (
  <div>
    <MainWrapper>
      <Question>Vraag</Question>
      <Answer>Uw antwoord</Answer>
      <Change>Wijzig</Change>
    </MainWrapper>

    {uitvoeringsregels.map((regel, index) => {
      const userAnswerId = userAnswers[regel.id];
      const userAnswer = regel.vraag.antwoordOpties
        .filter(antwoord => antwoord.id === userAnswerId)
        .map(antwoord => antwoord.optieText);
      const answer = userAnswer || '&nbsp;';
      return (
        <Wrapper key={regel.id}>
          <Question key={regel.vraag.vraagTekst}>
            {index + 1}: {regel.vraag.vraagTekst}
          </Question>
          <Answer key={answer}>{answer}</Answer>
          <Change>
            <button onClick={() => onGoToQuestion(regel.id)} type="button" href="#" key={regel.content.toelicht}>
              Wijzig
            </button>
          </Change>
        </Wrapper>
      );
    })}
  </div>
);

Overview.propTypes = {
  onGoToQuestion: PropTypes.func,
  uitvoeringsregels: PropTypes.array,
  userAnswers: PropTypes.object,
};

export default Overview;
