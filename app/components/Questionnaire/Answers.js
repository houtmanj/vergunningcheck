import React from 'react';
import PropTypes from 'prop-types';

import styled from '@datapunt/asc-core';
import { Button } from '@datapunt/asc-ui';

const AnswerFooter = styled(`div`)`
  margin-top: 20px;
`;

const Answers = ({
  className,
  answers,
  required,
  userAnswers,
  questionId,
  action,
  hideFooter,
  hasRegistry,
  setAnswer,
}) => {
  const userAnswer = (userAnswers && userAnswers[questionId]) || null;

  return (
    <>
      <div className={className}>
        {answers.map(answer => {
          // Set answer based on previous user input
          let backgroundColor = userAnswer && userAnswer === answer.value ? 'green' : '';
          // Overwrite if registry answered question
          if (hasRegistry) {
            backgroundColor =
              (setAnswer && answer.value === 'true') || (!setAnswer && answer.value === 'false') ? 'purple' : 'red';
          }

          // Check 'vergunningplichtig'
          const requiredText = required === answer.optieText ? '*' : '';

          return (
            <Button
              onClick={() => action(questionId, answer.value)}
              question-id={questionId}
              answer-id={answer.id}
              type="submit"
              key={answer.id}
              style={{ backgroundColor }}
              data-id={answer.id}
              variant="primary"
            >
              {answer.optieText} {requiredText}
            </Button>
          );
        })}
      </div>
      {!hideFooter && required && <AnswerFooter>* Vergunning nodig</AnswerFooter>}
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
  hideFooter: PropTypes.bool,
  hasRegistry: PropTypes.bool,
  setAnswer: PropTypes.bool,
};

const StyledAnswers = styled(Answers)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default StyledAnswers;
