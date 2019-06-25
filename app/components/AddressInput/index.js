import React from 'react';
import PropTypes from 'prop-types';

import { Button, TextField } from '@datapunt/asc-ui';
import './style.scss';

class AddressInput extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {}

  onFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log('submit');
  }

  render() {
    return (
      <div className="address-input">
        <form className="address-input-form" onSubmit={this.onFormSubmit}>
          <TextField label="Postcode" />
          <TextField label="Huisnummer" />
          <Button>Submit</Button>
        </form>
      </div>
    );
  }
}

AddressInput.defaultProps = {};

AddressInput.propTypes = {};

export default AddressInput;
