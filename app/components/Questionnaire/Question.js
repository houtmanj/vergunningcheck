import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import useForm from 'react-hook-form';
import { Heading, Paragraph } from '@datapunt/asc-ui';

import { ExplanationModal } from 'components/Modal';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import Answers from './Answers';
import MediaContainer from './MediaContainer';

const hasKeys = obj =>
  // convert to array, map, and then give the length
  Object.entries(obj).map(([key, value]) => [key, value]).length;

const Question = ({
  question: {
    id: questionId,
    vraagTekst: heading,
    antwoordOpties: answers,
    media,
    toelichting: visibleText,
    langeToelichting: hiddenText,
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
  userAnswers,
  required,
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
  }, [questionId]);

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
    <Form className={className} onSubmit={handleSubmit(onSubmit)} data-id={questionId}>
      {heading && <Heading $as={headingAs}>{heading}</Heading>}
      {media && <MediaContainer media={media} />}
      {visibleText && <ReactMarkdown source={visibleText} renderers={{ paragraph: Paragraph }} linkTarget="_blank" />}
      {hiddenText && <ExplanationModal modalText={hiddenText} />}
      <Answers
        questionId={questionId}
        onChange={handleChange}
        answers={answers}
        errors={errors}
        userAnswers={userAnswers}
      />
      {children}
      {!hideNavigation && (
        <Navigation
          page="question"
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
    id: '',
    vraagTekst: '',
  },
  headingAs: 'h3',
};

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    vraagTekst: PropTypes.string,
    antwoordOpties: PropTypes.array,
    media: PropTypes.array,
    toelichting: PropTypes.string,
    langeToelichting: PropTypes.string,
  }),
  className: PropTypes.string,
  headingAs: PropTypes.string,
  userAnswers: PropTypes.object,
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
