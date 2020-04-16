import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Label, Radio, RadioGroup } from "@datapunt/asc-ui";
import { StyledAnswerErrorText, StyledAnswer } from "./AnswersStyles";

const Answers = ({
  className,
  answers,
  currentAnswer,
  errors,
  disableInputs,
  questionId,
  onChange,
}) => (
  <StyledAnswer hasError={errors[questionId]}>
    {errors[questionId] && (
      <StyledAnswerErrorText>
        {errors[questionId].message}
      </StyledAnswerErrorText>
    )}
    <RadioGroup className={className} name={questionId}>
      {answers &&
        answers.map((answer) => {
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
                onChange={(e) => onChange(e)}
                checked={currentAnswer === answer.formValue}
              />
            </Label>
          );
        })}
    </RadioGroup>
  </StyledAnswer>
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
  disableInputs: PropTypes.bool,
  onChange: PropTypes.func,
};

export default StyledAnswers;
