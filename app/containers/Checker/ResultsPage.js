import React, { useContext } from 'react';
import { Paragraph, Button } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';
import { Alert } from '@datapunt/asc-assets';

import history from 'utils/history';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, PAGES, booleanOptions } from '../../constants';
import { CheckerContext } from './CheckerContext';
import DebugDecisionTable from '../../components/Questionnaire/DebugDecisionTable';

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
const UserResult = styled(`div`)`
  font-weight: bold;
  flex-direction: 'row';
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
        history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerConclusions}`);
      }}
    >
      <Paragraph strong>
        Hieronder kunt u per vraag uw gegeven antwoord teruglezen en eventueel wijzigen. Als u een wijziging doet moet u
        alle volgende vragen opnieuw beantwoorden.
      </Paragraph>
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
                <UserAnswer>{question.answer.replace(/['"]+/g, '')}</UserAnswer>
              ) : (
                <UserAnswer>{booleanOptions.find(option => option.value === question.answer).label}</UserAnswer>
              )}
              <Button onClick={() => onGoToQuestion(index)} variant="textButton">
                bewerken
              </Button>
            </Wrapper>
            {isDecisiveForPermits.map(permit => (
              <UserResult>
                <Alert style={{ width: '30px', marginBottom: '-8px', fill: '#ec0000' }} />
                <p style={{ marginBottom: '25px', marginLeft: '7px', display: 'inline-block' }}>
                  Op basis van dit antwoord bent u vergunningsplichtig voor{' '}
                  {permit.name.replace('Conclusie', '').toLowerCase()}
                </p>
              </UserResult>
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
      <DebugDecisionTable checker={checker} />
    </Form>
  );
};

export default ResultsPage;
