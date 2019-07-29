import React from 'react';
import PropTypes from 'prop-types';

const AddressInputResult = ({ title, loading, loadingText, children }) => (
  <div>
    {title && <h4>{title}</h4>}
    {loading && <div>{loadingText}</div>}
    {children && !loading && <div>{children}</div>}
  </div>
);

AddressInputResult.defaultProps = {
  loadingText: 'Laden...',
};

AddressInputResult.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  children: PropTypes.node,
};

export default AddressInputResult;
