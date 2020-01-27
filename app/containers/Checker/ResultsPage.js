import React, { useContext } from 'react';
import { Paragraph } from '@datapunt/asc-ui';

import history from 'utils/history';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, PAGES } from '../../constants';
import { CheckerContext } from './CheckerContext';

const ResultsPage = () => {
  const { checker } = useContext(CheckerContext);
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerDuties}`);
      }}
    >
      <Paragraph strong>Hier staan dan de antwoorden op de vragen:</Paragraph>
      <Paragraph style={{ marginBottom: '0px' }}>Daarna krijg je de plichten pagina</Paragraph>
      {checker.stack.map(question => (
        <Paragraph>
          {question.text}
          Antwoord: {question.answer}
        </Paragraph>
      ))}
      <Navigation
        page={`checker-${PAGES.checkerResult}`}
        onGoToPrev={() => history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerQuestions}`)}
        showPrev
        showNext
      />
    </Form>
  );
};

export default ResultsPage;
