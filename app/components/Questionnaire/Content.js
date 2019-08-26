import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ heading, headingDataId, paragraph, children }) => (
  <>
    <h3 data-id={headingDataId}>{heading}</h3>
    <p>{paragraph}</p>
    {children}
  </>
);

Content.propTypes = {
  heading: PropTypes.string,
  headingDataId: PropTypes.string,
  paragraph: PropTypes.string,
  children: PropTypes.element,
};

export default Content;
