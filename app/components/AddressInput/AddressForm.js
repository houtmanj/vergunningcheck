import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@datapunt/asc-ui';

const AddressForm = ({ onChange, onInput, debug }) => (
  <form className="address-input__form">
    <TextField
      className="address-input__input address-input__postcode"
      label="Postcode"
      defaultValue={debug && '1074VE'}
      placeholder="bv. 1074VE"
      onChange={onChange}
    />
    <TextField
      className="address-input__input address-input__streetnumber"
      label="Huisnummer + toevoeging"
      defaultValue={debug && '1'}
      onInput={onInput}
    />
  </form>
);

AddressForm.defaultProps = {
  onChange: null,
  onInput: null,
};

AddressForm.propTypes = {
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  debug: PropTypes.bool,
};

export default AddressForm;
