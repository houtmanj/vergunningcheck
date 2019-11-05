import React from 'react';
import ReactMarkdown from 'react-markdown';
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
      {rule.id}:<br />
      <br />
      <strong>{rule.vraagTekst}</strong>
      {rule.toelichting && <ReactMarkdown source={rule.toelichting} />}
      {rule.langeToelichting && <ReactMarkdown source={rule.langeToelichting} />}
    </QuestionContainer>
  ));

  // TOTAAL
  return <AllQuestionsContainer>{questions}</AllQuestionsContainer>;
};

export default AllQuestions;
