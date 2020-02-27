import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { useForm } from 'react-hook-form';
import { Heading, Paragraph } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

import { ExplanationModal } from 'components/Modal';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import Answers from './Answers';
import { PAGES, booleanOptions } from '../../constants';

const Image = styled(`img`)`
  max-width: 100%;
  border: 1px solid #aaa;
`;

const hasKeys = obj =>
  // convert to array, map, and then give the length
  Object.entries(obj).map(([key, value]) => [key, value]).length;

const Question = ({
  question: {
    id: questionId,
    type: questionType,
    text: questionTitle,
    options: questionAnswers,
    answer: currentAnswer,
    description,
    longDescription,
  },
  className,
  headingAs,
  onSubmit: onSubmitProp,
  hideNavigation,
  disableNext,
  showNext,
  showPrev,
  onGoToPrev,
  required,
}) => {
  const { handleSubmit, register, unregister, setValue, errors } = useForm();
  const listAnswers = questionAnswers?.map(answer => ({ label: answer, formValue: answer, value: answer }));
  const answers = questionType === 'string' ? listAnswers : booleanOptions;
  let answer;

  useEffect(() => {
    if (questionId && required) {
      register(
        { name: questionId },
        {
          required: 'Dit veld is verplicht',
        },
      );

      // Set value if question has already been answered to prevent 'fake' requirement
      if (currentAnswer !== undefined) {
        if (questionAnswers) {
          setValue(questionId, currentAnswer);
        } else {
          const responseObj = booleanOptions.find(o => o.value === currentAnswer);
          setValue(questionId, responseObj.formValue);
        }
      }
    }
    return () => unregister(questionId);
  }, [questionId]);

  const handleChange = e => {
    if (e.target.type === 'radio') setValue(e.target.name, e.target.value);
  };

  const onSubmit = data => {
    // Is only triggered with validated form
    // Check if data has a key that matches the questionId
    window.scrollTo(0, 0);
    if ((onSubmitProp && !hasKeys(data)) || (hasKeys(data) && data[questionId])) {
      onSubmitProp(data[questionId]);
    }
  };

  if (questionAnswers) {
    answer = currentAnswer;
  } else {
    const responseObj = booleanOptions.find(o => o.value === currentAnswer);
    answer = responseObj?.formValue;
  }

  return (
    <Form className={className} onSubmit={handleSubmit(onSubmit)} data-id={questionId}>
      {questionTitle && <Heading $as={headingAs}>{questionTitle}</Heading>}
      {description && (
        <ReactMarkdown source={description} renderers={{ paragraph: Paragraph, image: Image }} linkTarget="_blank" />
      )}
      {longDescription && <ExplanationModal modalText={longDescription} />}
      <Answers
        questionId={questionId}
        onChange={handleChange}
        errors={errors}
        answers={answers}
        currentAnswer={answer}
      />
      {!hideNavigation && (
        <Navigation
          page={`checker-${PAGES.checkerQuestions}`}
          showPrev={showPrev}
          showNext={showNext}
          onGoToPrev={onGoToPrev}
          disableNext={disableNext}
        />
      )}
    </Form>
  );
};

Question.defaultProps = {
  question: {
    answer: '',
    description: '',
    longDescription: '',
  },
  headingAs: 'h3',
};

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
    options: PropTypes.array,
    description: PropTypes.string,
    longDescription: PropTypes.string,
    answer: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  }),
  className: PropTypes.string,
  headingAs: PropTypes.string,
  onSubmit: PropTypes.func,
  hideNavigation: PropTypes.bool,
  required: PropTypes.bool,
  showNext: PropTypes.bool,
  showPrev: PropTypes.bool,
  disableNext: PropTypes.bool,
  onGoToPrev: PropTypes.func,
};

export default Question;
