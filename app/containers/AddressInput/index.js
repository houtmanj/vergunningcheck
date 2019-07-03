import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import messages from './messages';
import { Button, TextField } from '@datapunt/asc-ui';
import { getSuggestionsAction, fetchStreetname, fetchBagData } from '../App/actions';
import './style.scss';

class AddressInput extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onPostcodeInput = this.onPostcodeInput.bind(this);
    this.onStreetNumberInput = this.onStreetNumberInput.bind(this);
    this.state = {
      validPostcode: false,
      postcode: '',
      streetNumber: '',
      hasCompleteAddress: false,
      hasError: false,
    };
  }

  onPostcodeInput(event) {
    const { fetchStreetname } = this.props;
    const { streetNumber } = this.state;
    const { value: postcode } = event.target;

    const regexPostcode = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i;
    const validPostcode = regexPostcode.test(postcode);
    const hasError = postcode.length > 5 && !validPostcode;

    this.setState({
      validPostcode,
      postcode,
      hasError,
    });

    if (validPostcode) {
      const query = streetNumber ? postcode + ' ' + streetNumber : postcode;
      fetchStreetname(query);
    }
  }

  onStreetNumberInput(event) {
    const { onGetSuggestions, streetName } = this.props;
    const { postcode, validPostcode } = this.state;
    const { value: streetNumber } = event.target;

    this.setState({
      streetNumber,
    });

    if (validPostcode && streetName) {
      onGetSuggestions(query);
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    // const { suggestions, fetchBagData, bagStatus } = this.props;
    // const addressField = document.querySelector('.address-input__results__final');
    //
    // // if (suggestions.length < 1) {
    // //   this.setState({
    // //     hasError: true,
    // //   });
    // //   return;
    // // }
    //
    // const { uri = false } = suggestions[0];
    //
    // if (uri) {
    //   fetchBagData(uri);
    // }
  }

  render() {
    const {
      intl,
      streetName,
      streetnameLoading,
      suggestionLoading,
      suggestions,
      bagLoading,
      bagFetch,
      bagStatus,
      monumentFetch,
      monumentStatus = '',
      monumentLoading,
      isUnesco,
    } = this.props;

    const { validPostcode, postcode, streetNumber, hasError, debug } = this.state;
    const validPostcodeAmsterdam = validPostcode && streetName;
    const showError = hasError || !validPostcodeAmsterdam;
    const loading = streetnameLoading || suggestionLoading;
    const addressComplete = suggestions.toLowerCase() === streetName.toLowerCase() + ' ' + streetNumber.toLowerCase();

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

          {!loading && showError && (
            <div className="address-input__error">
              {!validPostcode && postcode.length > 5 && (
                <p>
                  De ingevoerde postcode is niet goed geformuleerd. Een postcode bestaat uit 4 cijfers en 2 letters.
                </p>
              )}
              {validPostcode && !validPostcodeAmsterdam && (
                <p>De ingevoerde postcode is niet gevonden in de Amsterdamse database. Probeer opnieuw.</p>
              )}
            </div>
          )}

          {!showError && validPostcode && (
            <div className="address-input__results">
              <h4 className="address-input__results__title">{intl.formatMessage(messages.resultaat)}</h4>
              {streetnameLoading && <div>Laden....</div>}
              {!streetnameLoading && streetName && (
                <div className={'address-input__results__item'}>
                  {streetName} {streetNumber}
                </div>
              )}
              <div>
                {suggestionLoading && <div>Laden....</div>}
                {!suggestionLoading && !streetnameLoading && (
                  <div>
                    {streetNumber && addressComplete && <div>Dit adres bestaat. Klik op bevestig</div>}
                    {streetNumber && !addressComplete && <div>Dit adres bestaat niet. Probeer opnieuw</div>}
                  </div>
                )}
              </div>
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
    suggestions = '',
    streetnameLoading,
    suggestionLoading,
    streetName,
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
    streetnameLoading,
    suggestionLoading,
    streetName,
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
      fetchBagData,
      fetchStreetname,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressInput);
