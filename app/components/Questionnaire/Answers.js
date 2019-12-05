import React from 'react';
import PropTypes from 'prop-types';

import styled from '@datapunt/asc-core';
import { Label, Radio, RadioGroup } from '@datapunt/asc-ui';
import PrefilledAnswerText from './PrefilledAnswerText';

import './style.scss';

const Answers = ({ className, answers, userAnswers, errors, questionId, onChange, hasRegistry, setAnswer }) => {
  const userAnswer = (userAnswers && userAnswers[questionId]) || null;
  const hasPrefilledAnswer = answers && answers.length ? answers.filter(answer => answer.prefilled).length > 0 : null;

  return (
    <>
      {hasPrefilledAnswer && <PrefilledAnswerText />}
      <div className={errors[questionId] ? 'error' : null}>
        {errors[questionId] && <div className="error-label">{errors[questionId].message}</div>}
        <RadioGroup className={className} name={questionId}>
          {answers &&
            answers.map(answer => {
              // Set answer based on previous user input or from registry source
              const checked =
                (userAnswer && userAnswer === answer.value) ||
                (hasRegistry && setAnswer && answer.value === 'true') ||
                (hasRegistry && !setAnswer && answer.value === 'false');
              const answerId = `${questionId}-${answer.id}`;

              return (
                <Label htmlFor={answerId} key={answerId} label={answer.optieText}>
                  <Radio
                    key={answerId}
                    value={answer.value}
                    id={answerId}
                    onChange={e => onChange(e)}
                    checked={checked}
                  />
                </Label>
              );
            })}
        </RadioGroup>
      </div>
    </>
  );
};

const StyledAnswers = styled(Answers)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

Answers.propTypes = {
  className: PropTypes.string,
  answers: PropTypes.array,
  errors: PropTypes.object,
  userAnswers: PropTypes.object,
  questionId: PropTypes.string,
  onChange: PropTypes.func,
  hasRegistry: PropTypes.bool,
  setAnswer: PropTypes.bool,
};

export default StyledAnswers;
