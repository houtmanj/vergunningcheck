import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Paragraph } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

import { areAllCondTrue } from 'shared/services/questionnaire/conditions';
import QuestionAnswers from 'components/Questionnaire/QuestionAnswers';

const Container = styled(`div`)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const QuestionOverview = ({ userAddress, uitkomsten, onGoToQuestion, userAnswers, uitvoeringsregels }) => (
  <Container>
    <Heading $as="h3">Controleer uw antwoorden</Heading>
    <Paragraph>Adres: {userAddress}</Paragraph>
    <Paragraph>
      Uitkomst:{' '}
      <strong>
        {uitkomsten.map(answer => (areAllCondTrue(answer.cond, userAnswers, uitvoeringsregels) ? answer.label : null))}
      </strong>
    </Paragraph>
    <Paragraph>
      Hieronder ziet u uw antwoorden terug. U kunt uw antwoorden eenvoudig wijzigen. Als u op volgende klikt, ziet u wat
      de vervolgstappen zijn.
    </Paragraph>
    <QuestionAnswers onGoToQuestion={onGoToQuestion} userAnswers={userAnswers} uitvoeringsregels={uitvoeringsregels} />
  </Container>
);

QuestionOverview.propTypes = {
  userAddress: PropTypes.string,
  uitkomsten: PropTypes.array,
  userAnswers: PropTypes.object,
  onGoToQuestion: PropTypes.func,
  uitvoeringsregels: PropTypes.array,
};

export default QuestionOverview;
