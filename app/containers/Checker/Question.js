import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { useForm } from 'react-hook-form';
import { Heading, Paragraph } from '@datapunt/asc-ui';

import { ExplanationModal } from 'components/Modal';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import Answers from './Answers';
import { PAGES } from '../../constants';

const booleanOptions = [
  {
    label: 'Nee',
    formValue: false,
    value: false,
  },
  {
    label: 'Ja',
    formValue: true,
    value: true,
  },
];

const hasKeys = obj =>
  // convert to array, map, and then give the length
  Object.entries(obj).map(([key, value]) => [key, value]).length;

const Question = ({
  question: {
    id: questionId,
    type: questionType,
    text: questionTitle,
    _options: questionAnswers,
    answer: currentAnswer,
    description,
    longDescription,
  },
  className,
  headingAs,
  children,
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

  useEffect(() => {
    if (questionId && required) {
      register(
        { name: questionId },
        {
          required: 'Dit veld is verplicht',
        },
      );

      // Set value if question has already been answered to prevent 'fake' requirement
      if (currentAnswer) {
        setValue(questionId, currentAnswer);
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
    if ((onSubmitProp && !hasKeys(data)) || (hasKeys(data) && data[questionId])) {
      onSubmitProp(data[questionId]);
    }
  };

  return (
    <Form className={className} onSubmit={handleSubmit(onSubmit)} data-id={questionId}>
      {questionTitle && <Heading $as={headingAs}>{questionTitle}</Heading>}
      {description && <ReactMarkdown source={description} renderers={{ paragraph: Paragraph }} linkTarget="_blank" />}
      {longDescription && <ExplanationModal modalText={longDescription} />}
      <Answers
        questionId={questionId}
        onChange={handleChange}
        errors={errors}
        answers={answers}
        currentAnswer={currentAnswer}
      />
      {children}
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
    description: PropTypes.string,
    longDescription: PropTypes.string,
    answer: PropTypes.string,
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
  children: PropTypes.node,
};

export default Question;
