import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

const StyledTextField = styled(TextField)`
  margin-bottom: 25px;
`;

const AddressInputFields = ({ className, onChange, onInput, debug }) => (
  <div className={className}>
    <StyledTextField
      className="address-input__input address-input__postcode"
      label="Postcode"
      defaultValue={debug && '1074VE'}
      placeholder="bv. 1074VE"
      onChange={onChange}
    />
    <StyledTextField
      className="address-input__input address-input__streetnumber"
      label="Huisnummer + toevoeging"
      defaultValue={debug && '1'}
      onInput={onInput}
    />
  </div>
);

AddressInputFields.defaultProps = {
  onChange: null,
  onInput: null,
};

AddressInputFields.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  debug: PropTypes.bool,
};

export default AddressInputFields;
