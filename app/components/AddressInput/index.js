import React from 'react';
import PropTypes from 'prop-types';

import { Button, TextField } from '@datapunt/asc-ui';
import './style.scss';

class AddressInput extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="address-input">
        <TextField label="Postcode" />
        <TextField label="Huisnummer" />
        <Button>Submit</Button>
      </div>
    );
  }
}

AddressInput.defaultProps = {};

AddressInput.propTypes = {};

export default AddressInput;
