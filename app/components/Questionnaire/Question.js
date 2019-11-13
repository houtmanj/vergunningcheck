import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Heading } from '@datapunt/asc-ui';

import { ExplanationModal } from 'components/Modal';
import Form from 'components/Form/Form';

const Question = ({ className, heading, headingAs, paragraph, modalText, children, ...otherProps }) => (
  <Form className={className} {...otherProps}>
    {heading && <Heading $as={headingAs}>{heading}</Heading>}
    {paragraph && <ReactMarkdown source={paragraph} />}
    {modalText && <ExplanationModal modalText={modalText} />}
    {children}
  </Form>
);

Question.defaultProps = {
  headingAs: 'h3',
};

Question.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string,
  headingAs: PropTypes.string,
  paragraph: PropTypes.string,
  modalText: PropTypes.string,
  children: PropTypes.any,
};

export default Question;
