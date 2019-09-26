import React from 'react';
import styled from '@datapunt/asc-core';

import { questionnaires } from 'shared/services/questionnaire/questionnaire';
const { basis: questionnaire } = questionnaires;

const Div = styled(`div`)`
  margin: 20px 0;
  white-space: nowrap;
`;

const QuestionnaireQuestions = () => {
  const { uitvoeringsregels } = questionnaire;

  let count = 0;
  const questions = uitvoeringsregels.map(rule => {
    if (rule.type === 'decision') {
      count += 1;
      const mainGroupQuestion = <Div key={rule.vraagTekst}>{`${count}: ${rule.id}: ${rule.vraagTekst}`}</Div>;
      const groupQuestions = rule.group.map(r => {
        if (r.type === 'input') {
          count += 1;
          return <Div style={{ marginLeft: 10 }} key={r.vraagTekst}>{`${count}: ${r.id}: ${r.vraagTekst}`}</Div>;
        }
        return null;
      });
      return (
        <div key={rule.id}>
          {mainGroupQuestion}
          {groupQuestions}
        </div>
      );
    }
    count += 1;
    return <Div key={rule.vraagTekst}>{`${count}: ${rule.id}: ${rule.vraagTekst}`}</Div>;
  });

  // TOTAAL
  return <div>{questions}</div>;
};

export default QuestionnaireQuestions;
