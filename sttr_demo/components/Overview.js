import React from 'react';

const Overview = ({ permits, stack, onEdit }) => {
  let permitsPerQuestion = [];
  permits.forEach(permit => {
    const conclusion = permit.getDecisionById('dummy');
    if (conclusion.getOutput() === '"Vergunningplicht"') {
      const decisiveDecisions = conclusion.getDecisiveInputs();
      decisiveDecisions.flatMap(decision => {
        decision.getDecisiveInputs().map(input => {
          const index = stack.indexOf(input);
          permitsPerQuestion[index] = (permitsPerQuestion[index] || []).concat(permit);
        });
      });
    }
  });
  console.log('permitIdsPerQuestion', permitsPerQuestion);

  return (
    <div>
      <ul>
        {stack.map((question, stackIndex) => {
          const isDecisiveForPermits = permitsPerQuestion[stackIndex] || [];
          console.log(stackIndex, isDecisiveForPermits);
          return (
            <li key={stackIndex}>
              <h3>{question.text}</h3>
              <p>
                {question.answer === true ? 'ja' : 'nee'} -
                <a href="#" onClick={() => onEdit(stackIndex)}>
                  {' '}
                  bewerken
                </a>
              </p>
              <div>
                {isDecisiveForPermits.map(permit => (
                  <p>
                    Op basis van dit antwoord bent u vergunningsplichtig voor <strong>{permit.name}</strong>
                  </p>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Overview;
