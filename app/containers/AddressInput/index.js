import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import messages from './messages';
import { Button, TextField } from '@datapunt/asc-ui';
import { getSuggestionsAction } from '../App/actions';
import './style.scss';

const getStreetName = suggestions => {
  if (suggestions.length < 1) return null;

  const streets = suggestions.reduce(category => {
    if (category.label === 'Straatnamen') return category.content;
  });

  const { content = [] } = streets;
  if (content.length === 1) {
    return content.map(street => street.label);
  }

  return null;
};

class AddressInput extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onStreetNumberInput = this.onStreetNumberInput.bind(this);
    this.state = {
      originalQuery: '',
      showSuggestions: false,
      streetNumber: null,
    };
  }

  componentDidMount() {
    const { onGetSuggestions, suggestions } = this.props;
  }

  onFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log('submit');
  }

  onInput(event) {
    // console.log('onInput:', event.target.value);
    const { onGetSuggestions } = this.props;

    onGetSuggestions(event.target.value);

    this.setState({
      showSuggestions: true,
    });
  }

  onStreetNumberInput(event) {
    this.setState({
      streetNumber: event.target.value,
    });
  }

  render() {
    const { intl, onGetSuggestions, suggestions } = this.props;
    const { showSuggestions, streetNumber } = this.state;
    const streetName = getStreetName(suggestions);

    return (
      <div className="address-input">
        <h3>
          <FormattedMessage {...messages.title} />
        </h3>
        <form className="address-input__form" onSubmit={this.onFormSubmit}>
          <TextField
            className="address-input__input"
            label={intl.formatMessage(messages.postcode)}
            onChange={this.onInput}
          />
          <TextField
            className="address-input__input"
            label={intl.formatMessage(messages.huisnummer)}
            onInput={this.onStreetNumberInput}
          />

          {showSuggestions && streetName && (
            <div className="address-input__results">
              <h4 className="address-input__results__title">{intl.formatMessage(messages.resultaat)}</h4>
              {streetName} {streetNumber}
            </div>
          )}

          <Button className="address-input__submit">{intl.formatMessage(messages.submit)}</Button>
        </form>
      </div>
    );
  }
}

AddressInput.defaultProps = {};

AddressInput.propTypes = {};

const mapStateToProps = state => {
  const { suggestions = [] } = state.global;
  return {
    suggestions,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onGetSuggestions: getSuggestionsAction,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressInput);
