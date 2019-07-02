import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import messages from './messages';
import { Button, TextField } from '@datapunt/asc-ui';
import { getSuggestionsAction, fetchBagData } from '../App/actions';
import './style.scss';

class AddressInput extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onPostcodeInput = this.onPostcodeInput.bind(this);
    this.onStreetNumberInput = this.onStreetNumberInput.bind(this);
    this.state = {
      showSuggestions: false,
      postalCode: '',
      streetNumber: '',
      hasCompleteAddress: false,
      hasError: false,
      debug: true,
    };
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

    const { suggestions, fetchBagData, bagStatus } = this.props;
    const addressField = document.querySelector('.address-input__results__final');

    if (suggestions.length < 1 || !suggestions[0].final) {
      this.setState({
        hasError: true,
      });
      return;
    }

    const { uri = false } = suggestions[0];

    if (uri) {
      fetchBagData(uri);
    }
  }

  render() {
    const {
      intl,
      onGetSuggestions,
      suggestions,
      bagLoading,
      bagFetch,
      bagStatus,
      monumentFetch,
      monumentStatus = '',
      monumentLoading,
      isUnesco,
    } = this.props;
    const { showSuggestions, hasError, debug } = this.state;

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
            defaultValue={debug && '1055x'}
          />
          <TextField
            className="address-input__input"
            label={intl.formatMessage(messages.huisnummer)}
            onInput={this.onStreetNumberInput}
            defaultValue={debug && '19'}
          />

          {hasError && <div className="address-input__error">Error...</div>}

          {showSuggestions && suggestions.length > 0 && (
            <div className="address-input__results">
              <h4 className="address-input__results__title">{intl.formatMessage(messages.resultaat)}</h4>
              {suggestions.map(suggestion => (
                <div
                  className={`address-input__results__item
                  ${suggestion.final && 'address-input__results__final'}`}
                  key={suggestion.label}
                >
                  {suggestion.label}
                </div>
              ))}
            </div>
          )}

          <Button className="address-input__submit">{intl.formatMessage(messages.submit)}</Button>
        </form>

        {monumentFetch && (
          <div>
            <h4>Monument:</h4>
            {monumentLoading && <div>Laden....</div>}
            {!monumentLoading && <div>Status: {monumentStatus || 'Geen monument'}</div>}
          </div>
        )}

        {bagFetch && (
          <div>
            <h4>Beschermd stadsgezicht:</h4>
            {bagLoading && <div>Laden....</div>}
            {!bagLoading && <div>Status: {isUnesco ? 'Ja' : 'Nee'}</div>}
          </div>
        )}
      </div>
    );
  }
}

AddressInput.defaultProps = {};

AddressInput.propTypes = {};

const mapStateToProps = state => {
  const {
    suggestions = [],
    bagFetch,
    bagLoading,
    bagStatus,
    monumentFetch,
    monumentLoading,
    monumentStatus,
    isUnesco,
  } = state.global;
  return {
    suggestions,
    bagFetch,
    bagLoading,
    bagStatus,
    monumentFetch,
    monumentLoading,
    monumentStatus,
    isUnesco,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onGetSuggestions: getSuggestionsAction,
      fetchBagData: fetchBagData,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressInput);
