import React, { useContext } from 'react';
import { Paragraph, Button } from '@datapunt/asc-ui';

import history from 'utils/history';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import styled from '@datapunt/asc-core';
import { GET_CURRENT_TOPIC, PAGES } from '../../constants';
import { CheckerContext } from './CheckerContext';
import DebugDecisionTable from '../../components/Questionnaire/DebugDecisionTable';
import { booleanOptions } from './Question';

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
    checker.rewindTo(index);
    history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerQuestions}`);
  };

  checker.permits.forEach(permit => {
    const conclusion = permit.getDecisionById('dummy');
    if (conclusion.getOutput() === '"Vergunningplicht"') {
      const decisiveDecisions = conclusion.getDecisiveInputs();
      decisiveDecisions.flatMap(decision => {
        decision.getDecisiveInputs().map(input => {
          const index = checker.stack.indexOf(input);
          permitsPerQuestion[index] = (permitsPerQuestion[index] || []).concat(permit);
          return true;
        });
      });
    }
  });

  // Something like this can be used to show the conclusions
  // const conclusions = checker?.permits.map(permit => {
  //   const decision = permit.getDecisionById('dummy');
  //   const rules = decision.getMatchingRules();
  //   return rules[0].description;
  // });

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
        return (
          <div key={question.id}>
            <Wrapper>
              <Question>{question.text}</Question>
              {question.options ? (
                <UserAnswer>{question.answer}</UserAnswer>
              ) : (
                <UserAnswer>{booleanOptions.find(option => option.value === question.answer).label}</UserAnswer>
              )}
              <Button onClick={() => onGoToQuestion(index)} variant="textButton">
                bewerken
              </Button>
            </Wrapper>
            {isDecisiveForPermits.map(permit => (
              <Wrapper>
                <Paragraph strong> Op basis van dit antwoord bent u vergunningsplichtig voor {permit.name}</Paragraph>
              </Wrapper>
            ))}
          </div>
        );
      })}
      <DebugDecisionTable checker={checker} />
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
