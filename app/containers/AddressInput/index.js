import React from 'react';
import PropTypes from 'prop-types';

import { Button, TextField } from '@datapunt/asc-ui';
import './style.scss';

// import { getSuggestionsAction } from '../../ducks/auto-suggest/auto-suggest';

class AddressInput extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.state = {
      originalQuery: '',
      showSuggestions: false,
    };
  }

  componentDidMount() {
    // const { onGetSuggestions } = this.props;
  }

  onFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log('submit');
  }

  onInput(event) {
    // const { onGetSuggestions } = this.props;
    //
    // event.persist();
    // if (activeSuggestion.index > -1) {
    //   this.resetActiveSuggestion();
    // }
    // onGetSuggestions(event.target.value);

    this.setState({
      showSuggestions: true,
    });
  }

  render() {
    // const { onGetSuggestions } = this.props;
    const { showSuggestions } = this.state;

    return (
      <div className="address-input">
        <form className="address-input__form" onSubmit={this.onFormSubmit}>
          <TextField className="address-input__input" label="Postcode" onChange={this.onInput} />
          <TextField className="address-input__input" label="Huisnummer" />
          <Button className="address-input__submit">Submit</Button>
        </form>

        {showSuggestions && (
          <div className="address-input__results">
            <h4 className="address-input__results__title">Resultaat:</h4>
          </div>
        )}
      </div>
    );
  }
}

AddressInput.defaultProps = {};

AddressInput.propTypes = {};

export default AddressInput;
