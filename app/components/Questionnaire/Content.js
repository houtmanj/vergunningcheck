import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Content = ({ className, heading, headingDataId, paragraph, children }) => (
  <div className={className}>
    {heading && <h3 data-id={headingDataId}>{heading}</h3>}
    {paragraph && <ReactMarkdown source={paragraph} />}
    {children}
  </div>
);

Content.defaultProps = {
  paragraph: null,
};

Content.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string,
  headingDataId: PropTypes.string,
  paragraph: PropTypes.string,
  children: PropTypes.any,
};

export default Content;
