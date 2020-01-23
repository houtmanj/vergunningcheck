import React, { useState, useEffect } from 'react';
import getChecker from 'sttr_client';

import Head from 'next/head';
import Tabs from './Tabs';
import Question from './Question';
import DecisionTable from './DecisionTable';
import Overview from './Overview';
import Conclusion from './Conclusion';

const PHASES = {
  location: 'LOCATION',
  questions: 'QUESTIONS',
  overview: 'OVERVIEW',
  conclusion: 'CONCLUSION',
};

const PermitChecker = ({ activity }) => {
  // XXX hack, react hooks are broken now!
  console.log('getChecker', JSON.stringify(activity, ';', 2));
  const x = getChecker(activity);
  const curr = x.next();

  const [checker, updateChecker] = useState(x);
  const [question, setQuestion] = useState(curr);
  const [currentAnswerValue, setCurrentAnswerValue] = useState(question.answer); // only holds primitive
  const [phase, setPhase] = useState(PHASES.location);
  return (
    <div>
      <Head>
        <title>Vraag</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tabs phase={phase} />
      <h1>{activity.name.replace('Conclusie ', '')}</h1>
      <form>
        {phase === PHASES.location && (
          <>
            <p>Waar wilt u ...?</p>
            <input
              style={{ float: 'right' }}
              type="button"
              value="volgende &raquo;"
              onClick={() => {
                setPhase(PHASES.questions);
              }}
            />
          </>
        )}
        {phase === PHASES.questions && (
          <div>
            <Question question={question} value={currentAnswerValue} onChange={setCurrentAnswerValue} />
            <div className="formNav">
              {checker.stack.length !== 1 && (
                <input
                  style={{ float: 'left' }}
                  type="button"
                  value="&laquo; vorige"
                  onClick={() => {
                    const prev = checker.previous();
                    setQuestion(prev);
                    setCurrentAnswerValue(prev.answer);
                  }}
                />
              )}
              <input
                style={{ float: 'right' }}
                type="button"
                disabled={currentAnswerValue === undefined}
                value="volgende &raquo;"
                onClick={() => {
                  question.setAnswer(currentAnswerValue);
                  if (
                    checker.permits.find(permit => {
                      permit.getOutputByDecisionId('dummy') === '"NeemContactOpMet"';
                    })
                  ) {
                    setPhase(PHASES.overview);
                  } else {
                    const next = checker.next();
                    if (!next) {
                      setPhase(PHASES.overview);
                    } else {
                      setQuestion(next);
                      setCurrentAnswerValue(next.answer);
                    }
                    updateChecker(checker);
                  }
                }}
              />
              <div style={{ clear: 'both' }}></div>{' '}
            </div>
          </div>
        )}
        {phase === PHASES.overview && (
          <div>
            <Overview
              permits={checker.permits}
              stack={checker.stack}
              onEdit={index => {
                const q = checker.rewindTo(index);
                setQuestion(q);
                setCurrentAnswerValue(q.answer);
                setPhase(PHASES.questions);
              }}
            />
            <input
              style={{ float: 'left' }}
              type="button"
              value="&laquo; vorige"
              onClick={() => {
                const prev = checker.previous();
                setQuestion(prev);
                setCurrentAnswerValue(prev.answer);
                setPhase(PHASES.questions);
              }}
            />
            <input
              style={{ float: 'right' }}
              type="button"
              value="volgende &raquo;"
              onClick={() => {
                setPhase(PHASES.conclusion);
              }}
            />
          </div>
        )}
        {phase === PHASES.conclusion && (
          <>
            <Conclusion checker={checker} />
            <input
              type="button"
              value="&laquo; vorige"
              onClick={() => {
                setPhase(PHASES.overview);
              }}
            />
          </>
        )}
      </form>

      <div className="debug">
        <DecisionTable checker={checker} />
      </div>
      <style jsx>{`
        .debug {
          margin-top: 6em;
          opacity: 0.5;
        }
        .formNav {
          margin: 2em 0;
        }
      `}</style>
    </div>
  );
};

export default PermitChecker;
