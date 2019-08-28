import React from 'react';
import PropTypes from 'prop-types';

const Overview = ({ uitvoeringsregels, userAnswers, onGoToQuestion }) => (
  <div>
    {uitvoeringsregels.map((regel, index) => {
      const userAnswer = userAnswers[regel.id];
      const answer = regel.vraag.antwoordOpties
        .filter(antwoord => antwoord.id === userAnswer)
        .map(antwoord => antwoord.optieText);
      return (
        <div key={regel.id} style={{ columnCount: '3' }}>
          <div key={regel.vraag.vraagTekst}>
            {index}: {regel.vraag.vraagTekst}
          </div>
          <div key={answer}>{answer}</div>
          <button onClick={() => onGoToQuestion(regel.id)} type="button" href="#" key={regel.content.toelicht}>
            Wijzig
          </button>
        </div>
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
