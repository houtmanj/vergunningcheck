import React, { useContext } from 'react';
import { Paragraph, Button } from '@datapunt/asc-ui';

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
  const permitsPerQuestion = [];

  const onGoToQuestion = index => {
    checker.rewindTo(index - 1);
    history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerQuestions}`);
  };

  checker.permits.forEach(permit => {
    const conclusion = permit.getDecisionById('dummy');
    if (conclusion.getOutput() === '"Vergunningplicht"') {
      const decisiveDecisions = conclusion.getDecisiveInputs();
      console.log(decisiveDecisions);
      decisiveDecisions.flatMap(decision => {
        console.log(decision);
        decision.getDecisiveInputs().map(input => {
          const index = checker.stack.indexOf(input);
          const response = (permitsPerQuestion[index] = (permitsPerQuestion[index] || []).concat(permit));
          return response;
        });
      });
    }
  });
  console.log('permitIdsPerQuestion', permitsPerQuestion);

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
      {checker?.stack?.map((question, index) => {
        const isDecisiveForPermits = permitsPerQuestion[index] || [];
        console.log(index, isDecisiveForPermits);
        return (
          <div key={question.id}>
            <Wrapper>
              <Question>{question.text}</Question>
              <UserAnswer>{question.answer === 'yes' ? 'ja' : 'nee'}</UserAnswer>
              <Button onClick={() => onGoToQuestion(index)} variant="textButton">
                bewerken
              </Button>
            </Wrapper>
            {isDecisiveForPermits.map(permit => (
              <Wrapper>
                <Paragraph>
                  {' '}
                  basis van dit antwoord bent u vergunningsplichtig voor <strong>{permit.name}</strong>
                </Paragraph>
              </Wrapper>
            ))}
          </div>
        );
      })}
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
