import React from 'react';
import PropTypes from 'prop-types';

const AddressInputErrors = ({ error, className }) => (error ? <p className={className}>{error}</p> : null);

AddressInputErrors.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
};

export default AddressInputErrors;
