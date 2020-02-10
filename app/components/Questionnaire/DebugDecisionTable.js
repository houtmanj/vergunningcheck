/* eslint-disable */
import React from 'react';

export default ({ checker }) => {
  const decisionId = 'dummy';
  window.checker = checker;

  const relevantOpenQuestions = checker._getRelevantOpenQuestions();
  return (
    <>
      <div style={{ display: 'block' }}>
        <h1>Questions</h1>
        <table cellPadding="1" cellSpacing="1">
          <thead>
            <tr>
              <th>Vraag</th>
              <th>Antwoord</th>
            </tr>
          </thead>
          <tbody>
            {checker.stack.map(q => (
              <tr key={q.id}>
                <td>{q.text}</td>
                <td>{q.answer !== undefined ? q.answer.toString() : <em>[current]</em>}</td>
              </tr>
            ))}
            {relevantOpenQuestions.map(q => (
              <tr key={q.id}>
                <td>{q.text}</td>
                <td>
                  <em>...</em>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1>Permits</h1>
      {checker.permits.map(permit => {
        const conclusionString = permit.getOutputByDecisionId(decisionId);
        const conclusion = permit.getDecisionById(decisionId);
        const matchineRules = conclusion.getMatchingRules();
        const decisiveDecisions = conclusion.getDecisiveInputs();

        return (
          <div key={permit.name}>
            <h2>{permit.name}</h2>
            {permit._decisions.map((decision, i) => {
              const matchingRules = decision.getMatchingRules();
              const rules = decision._rules;
              const questions = decision._inputs;
              const decisiveInputs = decision.getDecisiveInputs();
              return (
                <div key={decision.id}>
                  <h3>
                    Decision {decision.id === 'dummy' ? decision.id : i} ({matchingRules.length !== 0 && 'CONCLUSIVE'})
                  </h3>
                  <div style={{ marginLeft: '2em' }}>
                    <div>
                      <strong>Vragen</strong>
                      <ol>
                        {questions.map(q => {
                          return (
                            <li key={q.id} style={{ fontWeight: decisiveInputs.indexOf(q) > -1 ? 'bold' : 'normal' }}>
                              {q.text}
                              <br />
                              Antwoord:{' '}
                              {q.answer !== undefined ? <b>{JSON.stringify(q.answer)}</b> : <em>undefined</em>}
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                    <div>
                      <strong>Rules:</strong>
                      <ol>
                        {rules.map(r => {
                          return (
                            <li
                              key={r.inputConditions + r.outputValue}
                              style={{ fontWeight: matchingRules.indexOf(r) > -1 ? 'bold' : 'normal' }}
                            >
                              inputConditions: {JSON.stringify(r.inputConditions)}
                              <br />
                              outputValue: {r.outputValue}
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                    {/* <div>
                      {decisiveInputs.map(input => (
                        <div>
                          Vraag ({input.type}) "{input.text}"
                        </div>
                      ))}
                    </div> */}

                    {/* <div>{JSON.stringify(rules)}</div> */}
                  </div>
                </div>
              );
            })}

            <p>
              <b>{conclusionString || <em>[unknown]</em>}</b>
              .<br />
              {decisiveDecisions.map(decision => decision.getDecisiveInputs().map(question => question.text))}
            </p>
            <h3>Notes:</h3>
            {matchineRules.map(({ description }) => (
              <p>- {description}</p>
            ))}

            <div className="details" style={{ display: 'none' }}>
              <h1>Overview</h1>
              <div>
                {/* <Overview decision={conclusion} stack={checker.stack} /> */}

                <pre>
                  <code>{JSON.stringify(conclusion, ';', 2)}</code>
                </pre>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
