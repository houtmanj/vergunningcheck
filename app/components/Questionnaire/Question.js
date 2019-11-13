import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import useForm from 'react-hook-form';
import { Heading, Paragraph } from '@datapunt/asc-ui';

import { ExplanationModal } from 'components/Modal';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import Answers from './Answers';
import ImageContainer from './ImageContainer';

const hasKeys = obj =>
  // convert to array, map, and then give the length
  Object.entries(obj).map(([key, value]) => [key, value]).length;

const Question = ({
  questionId,
  className,
  heading,
  headingAs,
  paragraph,
  modalText,
  children,
  media,
  onSubmit: onSubmitProp,
  hideNavigation,
  disableNext,
  showNext,
  showPrev,
  onGoToPrev,
  answers,
  userAnswers,
  required,
  ...otherProps
}) => {
  const { handleSubmit, register, unregister, setValue, errors } = useForm();

  useEffect(() => {
    if (questionId && required) {
      register(
        { name: questionId },
        {
          required: 'Dit veld is verplicht',
        },
      );

      // Set value if question has already been answered to prevent 'fake' requirement
      if (userAnswers && userAnswers[questionId]) {
        setValue(questionId, userAnswers[questionId]);
      }
    }
    return () => unregister(questionId);
  }, [questionId, register, unregister, setValue]);

  const handleChange = e => {
    if (e.target.type === 'radio') setValue(e.target.name, e.target.value);
  };

  const onSubmit = data => {
    // Is only triggered with validated form

    // Check if data has a key that matches the questionId
    if ((onSubmitProp && !hasKeys(data)) || (hasKeys(data) && data[questionId])) {
      onSubmitProp(questionId, data[questionId]);
    }
  };

  return (
    <Form className={className} onSubmit={handleSubmit(onSubmit)} data-id={questionId} {...otherProps}>
      {heading && <Heading $as={headingAs}>{heading}</Heading>}
      {paragraph && <ReactMarkdown source={paragraph} renderers={{ paragraph: Paragraph }} linkTarget="_blank" />}
      {media && <ImageContainer media={media} />}
      {modalText && <ExplanationModal modalText={modalText} />}
      {errors[questionId] && errors[questionId].message}
      <Answers questionId={questionId} onChange={handleChange} answers={answers} userAnswers={userAnswers} />
      {children}
      {!hideNavigation && (
        <Navigation showPrev={showPrev} showNext={showNext} onGoToPrev={onGoToPrev} disableNext={disableNext} />
      )}
    </Form>
  );
};

Question.defaultProps = {
  headingAs: 'h3',
};

Question.propTypes = {
  questionId: PropTypes.string,
  className: PropTypes.string,
  heading: PropTypes.string,
  headingAs: PropTypes.string,
  paragraph: PropTypes.string,
  modalText: PropTypes.string,
  answers: PropTypes.array,
  media: PropTypes.array,
  userAnswers: PropTypes.object,
  onSubmit: PropTypes.func,
  hideNavigation: PropTypes.bool,
  required: PropTypes.bool,
  showNext: PropTypes.bool,
  showPrev: PropTypes.bool,
  disableNext: PropTypes.bool,
  onGoToPrev: PropTypes.func,
  children: PropTypes.any,
};

export default Question;
