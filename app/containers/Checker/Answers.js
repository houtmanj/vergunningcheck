import React from 'react';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';
import { Label, Radio, RadioGroup } from '@datapunt/asc-ui';
import './error-style.scss';

const Answers = ({ className, answers, currentAnswer, errors, questionId, onChange }) => (
  <div className={errors[questionId] ? 'error' : null}>
    {errors[questionId] && <div className="error-label">{errors[questionId].message}</div>}
    <RadioGroup className={className} name={questionId}>
      {answers &&
        answers.map(answer => {
          const { label, formValue } = answer;
          const answerId = `${questionId}-${formValue}`;
          return (
            <Label htmlFor={answerId} key={answerId} label={label.replace(/['"]+/g, '')}>
              <Radio
                key={answerId}
                value={formValue}
                id={answerId}
                onChange={e => onChange(e)}
                checked={currentAnswer === answer.formValue}
              />
            </Label>
          );
        })}
    </RadioGroup>
  </div>
);

const StyledAnswers = styled(Answers)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

Answers.propTypes = {
  className: PropTypes.string,
  currentAnswer: PropTypes.string,
  errors: PropTypes.any,
  answers: PropTypes.array,
  questionId: PropTypes.string,
  onChange: PropTypes.func,
};

export default StyledAnswers;
