import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@datapunt/asc-ui';

const Answers = ({ answers, userAnswers, questionId, onGoToNext }) => {
  const userAnswer = userAnswers[questionId] || null;

  return (
    <div>
      {answers.map(answer => {
        let prefilled = answer.waarde ? { background: 'LimeGreen' } : {};
        if (userAnswer) {
          prefilled = {};
          if (userAnswer === answer.id) {
            prefilled = { background: 'green' };
          }
        }
        return (
          <Button
            onClick={() => onGoToNext(questionId, answer.id)}
            question-id={questionId}
            answer-id={answer.id}
            type="submit"
            key={answer.id}
            style={prefilled}
            data-id={answer.id}
            variant="secondary"
          >
            {answer.optieText}
          </Button>
        );
      })}
    </div>
  );
};
Answers.propTypes = {
  answers: PropTypes.array,
  userAnswers: PropTypes.object,
  questionId: PropTypes.string,
  onGoToNext: PropTypes.func,
};

export default Answers;
