import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import messages from './messages';
import { Button, TextField } from '@datapunt/asc-ui';
import { getSuggestionsAction, fetchMonumentData } from '../App/actions';
import './style.scss';

const getStreetName = suggestions => {
  if (suggestions.length < 1) return null;

  const streets = suggestions.reduce(category => {
    if (category.label === 'Straatnamen') return category.content;
  });

  const { content = [] } = streets;

  return content;
};

class AddressInput extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onPostcodeInput = this.onPostcodeInput.bind(this);
    this.onStreetNumberInput = this.onStreetNumberInput.bind(this);
    this.state = {
      originalQuery: '',
      showSuggestions: false,
      postalCode: '',
      streetNumber: '',
      hasCompleteAddress: false,
      hasError: false,
    };
  }

  componentDidMount() {
    const { onGetSuggestions, suggestions, fetchMonumentData } = this.props;

    const uriTest = 'bag/verblijfsobject/0363010012062064/';
    fetchMonumentData(uriTest);
  }

  onPostcodeInput(event) {
    const { onGetSuggestions } = this.props;
    const { streetNumber } = this.state;

    this.setState({
      showSuggestions: true,
      postalCode: event.target.value,
      hasError: false,
    });

    const query = streetNumber ? event.target.value + ' ' + streetNumber : event.target.value;
    onGetSuggestions(query);
  }

  onStreetNumberInput(event) {
    const { onGetSuggestions } = this.props;
    const { postalCode } = this.state;

    this.setState({
      streetNumber: event.target.value,
      hasError: false,
    });

    const query = postalCode + ' ' + event.target.value;
    onGetSuggestions(query);
  }

  onFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const addressField = document.querySelector('.address-input__results__final');

    if (!addressField || !addressField.textContent) {
      this.setState({
        hasError: true,
      });
      return;
    }

    const { textContent } = addressField;

    const { suggestions } = this.props;
    const { label, uri } = suggestions[0].content[0];

    console.log('URI', uriTest);
    console.log('LABEL', label);
  }

  render() {
    const { intl, onGetSuggestions, suggestions } = this.props;
    const { showSuggestions, streetNumber, hasError } = this.state;
    const streetName = getStreetName(suggestions) || [];

    return (
      <div className="address-input">
        <h3>
          <FormattedMessage {...messages.title} />
        </h3>
        <form className="address-input__form" onSubmit={this.onFormSubmit}>
          <TextField
            className="address-input__input"
            label={intl.formatMessage(messages.postcode)}
            onChange={this.onPostcodeInput}
          />
          <TextField
            className="address-input__input"
            label={intl.formatMessage(messages.huisnummer)}
            onInput={this.onStreetNumberInput}
          />

          {hasError && <div className="address-input__error">Error...</div>}

          {showSuggestions && streetName.length > 0 && (
            <div className="address-input__results">
              <h4 className="address-input__results__title">{intl.formatMessage(messages.resultaat)}</h4>
              {streetName.length > 0 &&
                streetName.map(street => (
                  <div
                    className={`address-input__results__item ${streetName.length === 1 &&
                      streetNumber &&
                      'address-input__results__final'}`}
                    key={street.label}
                  >
                    {street.label}
                  </div>
                ))}
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
      fetchMonumentData: fetchMonumentData,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressInput);
