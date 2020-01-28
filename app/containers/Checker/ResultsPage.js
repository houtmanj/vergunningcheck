import React, { useContext } from 'react';
import { Paragraph } from '@datapunt/asc-ui';

import history from 'utils/history';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import styled from '@datapunt/asc-core';
import { GET_CURRENT_TOPIC, PAGES } from '../../constants';
import { CheckerContext } from './CheckerContext';

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
const ResultsPage = () => {
  const { checker } = useContext(CheckerContext);

  const onGoToQuestion = index => {
    checker.rewindTo(index - 1);
    history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerQuestions}`);
  };

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerDuties}`);
      }}
    >
      <Paragraph strong>Hier staan dan de antwoorden op de vragen:</Paragraph>
      <Paragraph style={{ marginBottom: '0px' }}>Daarna krijg je de plichten pagina</Paragraph>
      <MainWrapper>
        <Question>Vraag</Question>
        <UserAnswer>Uw antwoord</UserAnswer>
        <Change>Wijzig</Change>
      </MainWrapper>

      {checker?.stack?.map((question, index) => (
        <Wrapper key={question.id}>
          <Question>
            {question.text}
            <br />
            {question?.description}
            <p>
              <em>{index + 1}:</em>
            </p>
          </Question>
          <UserAnswer>
            {question.answer === 'yes' ? 'ja' : 'nee'} -
            <a href="#" onClick={() => onGoToQuestion(index)}>
              {' '}
              bewerken
            </a>
          </UserAnswer>
        </Wrapper>
      ))}
      <Navigation
        page={`checker-${PAGES.checkerResult}`}
        onGoToPrev={() => onGoToQuestion(checker.stack.length - 1)}
        showPrev
        showNext
      />
    </Form>
  );
};

export default ResultsPage;
