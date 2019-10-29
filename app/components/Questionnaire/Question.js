import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Heading } from '@datapunt/asc-ui';

import Form from 'components/Form/Form';

const Modal = props => <div style={{ border: '1px solid red', marginBottom: 20 }}>{props.modalText}</div>;

Modal.propTypes = {
  modalText: PropTypes.string,
};

const Question = ({ className, heading, headingDataId, paragraph, modalText, children, ...otherProps }) => (
  <Form className={className} {...otherProps}>
    {heading && (
      <Heading $as="h3" data-id={headingDataId}>
        {heading}
      </Heading>
    )}
    {paragraph && <ReactMarkdown source={paragraph} />}
    {modalText && <Modal modalText={modalText} />}
    {children}
  </Form>
);

Question.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string,
  headingDataId: PropTypes.string,
  paragraph: PropTypes.string,
  modalText: PropTypes.string,
  children: PropTypes.any,
};

export default Question;
