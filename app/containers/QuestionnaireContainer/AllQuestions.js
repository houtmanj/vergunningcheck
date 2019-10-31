import React from 'react';
import styled from '@datapunt/asc-core';

import { questionnaires } from 'shared/services/questionnaire/questionnaire';

const { dePijp2018: questionnaire } = questionnaires;

const AllQuestionsContainer = styled(`ol`)`
  margin: 20px 0;
  max-width: 100%;
`;
const QuestionContainer = styled(`li`)`
  margin: 20px 0;
`;

const { uitvoeringsregels } = questionnaire;
const AllQuestions = () => {
  const questions = uitvoeringsregels.map(rule => (
    <QuestionContainer key={rule.vraagTekst}>
      {rule.id}: <strong>{rule.vraagTekst}</strong>
      <br />
      <br />
      {rule.toelichting && `Toelichting: ${rule.toelichting}`}
      {rule.langeToelichting && (
        <>
          <br /> <br /> Lange toelichting: {rule.langeToelichting}
        </>
      )}
    </QuestionContainer>
  ));

  // TOTAAL
  return <AllQuestionsContainer>{questions}</AllQuestionsContainer>;
};

export default AllQuestions;
