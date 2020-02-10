import React from 'react';

export default ({ checker }) => {
  const decisionId = 'dummy';
  window.checker = checker;
  return (
    <>
      {checker.permits.map(permit => {
        const conclusionString = permit.getOutputByDecisionId(decisionId);
        const conclusion = permit.getDecisionById(decisionId);
        const matchineRules = conclusion.getMatchingRules();
        const decisiveDecisions = conclusion.getDecisiveInputs();
        return (
          <div key={permit.name}>
            <h1>{permit.name}</h1>
            <table>
              <tbody>
                {permit._decisions.map((decision, i) => {
                  const rules = decision.getMatchingRules();
                  const questions = decision.getDecisiveInputs();
                  return (
                    <tr key={decision.id}>
                      <td>Decision {decision.id === 'dummy' ? decision.id : i}</td>
                      <td>
                        {rules.length > 0 ? (
                          rules.map(rule => <div key={rule.id}>{rule.outputValue}</div>)
                        ) : (
                          <em>[unknown]</em>
                        )}
                      </td>
                      <td>
                        {questions.map(input => (
                          <div>
                            Vraag ({input.type}) "{input.text}"
                          </div>
                        ))}
                      </td>
                      <td>{JSON.stringify(rules)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p>
              <b>{conclusionString || <em>[unknown]</em>}</b>
              .<br />
              {decisiveDecisions.map(decision => decision.getDecisiveInputs().map(question => question.text))}
            </p>
            <h3>Notes:</h3>
            {matchineRules.map(({ description, inputConditions, outputValue }) => (
              <p key={{ inputConditions, outputValue }}>- {description}</p>
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
