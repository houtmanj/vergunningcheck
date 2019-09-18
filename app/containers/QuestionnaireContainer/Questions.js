import React from 'react';
import styled from '@datapunt/asc-core';

import config from './config';

const Div = styled(`div`)`
  margin: 20px 0;
  white-space: nowrap;
`;

const QuestionnaireQuestions = () => {
  const { uitvoeringsregels } = config;

  // TOTAAL
  return (
    <div>
      {uitvoeringsregels.map((regel, index) => (
        <Div key={regel.vraag.vraagTekst}>{`${index + 1}: ${regel.id}: ${regel.vraag.vraagTekst}`}</Div>
      ))}
    </div>
  );
};

export default QuestionnaireQuestions;
