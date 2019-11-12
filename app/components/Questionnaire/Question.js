import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import useForm from 'react-hook-form';
import { Heading } from '@datapunt/asc-ui';

import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import Answers from './Answers';

const Modal = props => <div style={{ border: '1px solid red', marginBottom: 20 }}>{props.modalText}</div>;

Modal.propTypes = {
  modalText: PropTypes.string,
};

const Question = ({
  questionId,
  className,
  heading,
  headingAs,
  paragraph,
  modalText,
  children,
  onSubmit: onSubmitProp,
  showNext,
  showPrev,
  onGoToPrev,
  answers,
  userAnswers,
  required,
  ...otherProps
}) => {
  const { handleSubmit, register, unregister, setValue, errors } = useForm();
  React.useEffect(() => {
    if (questionId && required) {
      register(
        { name: questionId },
        {
          required: 'Dit veld is verplicht',
        },
      );
    }
    return () => unregister(questionId);
  }, [questionId, register, unregister]);

  const handleChange = e => {
    if (e.target.type === 'radio') setValue(e.target.name, e.target.value);
  };

  const onSubmit = data => {
    // is only triggered with validated form
    if (onSubmitProp) onSubmitProp(questionId, data[questionId]);
    unregister({});
  };
  // if (userAnswers && userAnswers[questionId]) {
  // setValue(questionId, userAnswers[questionId]);
  // }

  return (
    <Form className={className} onSubmit={handleSubmit(onSubmit)} data-id={questionId} {...otherProps}>
      {heading && <Heading $as={headingAs}>{heading}</Heading>}
      {paragraph && <ReactMarkdown source={paragraph} />}
      {modalText && <Modal modalText={modalText} />}
      {errors[questionId] && errors[questionId].message}
      <Answers questionId={questionId} onChange={handleChange} answers={answers} userAnswers={userAnswers} />
      {children}
      <Navigation showPrev={showPrev} showNext={showNext} onGoToPrev={onGoToPrev} />
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
  userAnswers: PropTypes.object,
  onSubmit: PropTypes.func,
  showNext: PropTypes.bool,
  showPrev: PropTypes.bool,
  required: PropTypes.bool,
  onGoToPrev: PropTypes.func,
  children: PropTypes.any,
};

export default Question;
