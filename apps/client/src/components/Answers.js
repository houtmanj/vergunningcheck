import React from "react";
import PropTypes from "prop-types";
import styled from "@datapunt/asc-core";
import { Label, Radio, RadioGroup } from "@datapunt/asc-ui";
// import './error-style.scss';

// .error {
//     color: red;
//     border-left: 2px solid red;
//     padding-left: 15px;
//   }

//   .error-label {
//     font-weight: 800;
//     margin: 10px 0;
//   }

const Answers = ({
  className,
  answers,
  currentAnswer,
  errors,
  disableInputs,
  questionId,
  onChange
}) => (
  <div className={errors[questionId] ? "error" : null}>
    {errors[questionId] && (
      <div className="error-label">{errors[questionId].message}</div>
    )}
    <RadioGroup className={className} name={questionId}>
      {answers &&
        answers.map(answer => {
          const { label, formValue } = answer;
          const answerId = `${questionId}-${formValue}`;
          return (
            <Label
              htmlFor={answerId}
              key={answerId}
              disabled={disableInputs}
              label={label.replace(/['"]+/g, "")}
            >
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
  onChange: PropTypes.func
};

export default StyledAnswers;
