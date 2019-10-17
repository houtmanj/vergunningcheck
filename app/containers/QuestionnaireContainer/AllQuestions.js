import React from 'react';
import styled from '@datapunt/asc-core';

import { questionnaires } from 'shared/services/questionnaire/questionnaire';

const { dePijp2018: questionnaire } = questionnaires;

const Div = styled(`div`)`
  margin: 20px 0;
  white-space: nowrap;
`;

const { uitvoeringsregels } = questionnaire;
const AllQuestions = () => {
  const questions = uitvoeringsregels.map((rule, index) => (
    <Div key={rule.vraagTekst}>
      {`${index}: ${rule.id}`}: <strong>{rule.vraagTekst}</strong>
    </Div>
  ));

  // TOTAAL
  return <div>{questions}</div>;
};

export default AllQuestions;
