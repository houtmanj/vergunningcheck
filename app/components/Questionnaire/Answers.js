import React from 'react';
import PropTypes from 'prop-types';

import styled from '@datapunt/asc-core';
import { Button } from '@datapunt/asc-ui';

const AnswerFooter = styled(`div`)`
  margin-top: 20px;
`;

const Answers = ({ className, answers, required, userAnswers, questionId, action }) => {
  const userAnswer = userAnswers[questionId] || null;

  return (
    <>
      <div className={className}>
        {answers.map(answer => {
          let prefilled = answer.prefilled ? { background: 'Purple' } : {};
          if (userAnswer) {
            prefilled = {};
            if (userAnswer === answer.id) {
              prefilled = { background: 'green' };
            }
          }
          // Check 'vergunningplichtig'
          const requiredText = required === answer.optieText ? '*' : '';

          return (
            <Button
              onClick={() => action(questionId, answer.id)}
              question-id={questionId}
              answer-id={answer.id}
              type="submit"
              key={answer.id}
              style={prefilled}
              data-id={answer.id}
              variant="secondary"
            >
              {answer.optieText} {requiredText}
            </Button>
          );
        })}
      </div>
      <AnswerFooter>* Vergunning nodig</AnswerFooter>
    </>
  );
};

Answers.propTypes = {
  className: PropTypes.string,
  required: PropTypes.string,
  answers: PropTypes.array,
  userAnswers: PropTypes.object,
  questionId: PropTypes.string,
  action: PropTypes.func,
};

export default Answers;
