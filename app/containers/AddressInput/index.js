import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, TextField } from '@datapunt/asc-ui';
import messages from './messages';
import { fetchStreetname, fetchBagData } from '../App/actions';
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
      hasError: false,
      // debug: true,
    };
  }

  onPostcodeInput(event) {
    const { onfetchStreetname } = this.props;
    const { streetNumber } = this.state;
    const { value: postcode } = event.target;
    const regexPostcode = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i;
    const validPostcode = regexPostcode.test(postcode);
    const hasError = postcode.length > 5 && !validPostcode;

    if (streetNumber) {
      document.querySelector('.address-input__streetnumber').value = '';
      this.setState({
        streetNumber: false,
      });
    }

    this.setState({
      validPostcode,
      postcode,
      hasError,
    });

    if (validPostcode) {
      onfetchStreetname(postcode);
    }
  }

  onStreetNumberInput(event) {
    const { value: streetNumber } = event.target;

    this.setState({
      streetNumber,
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const { onFetchBagData } = this.props;
    const { streetNumber, postcode, validPostcode } = this.state;

    if (postcode && streetNumber && validPostcode) {
      onFetchBagData(postcode, streetNumber);
      return;
    }

    this.setState({
      hasError: true,
    });
  }

  render() {
    const {
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
    } = this.props;

    const loading = streetnameLoading || suggestionLoading || bagLoading;
    const { validPostcode, postcode, streetNumber, hasError, debug } = this.state;
    const notValidPostcodeAmsterdam = validPostcode && !streetName;
    const notValidAddress = bagFetch && !bagStatus.pandId;
    const showError = hasError || notValidPostcodeAmsterdam || notValidAddress;
    const notValidPostcode = !validPostcode || postcode.length !== 6;
    const notValidStreetNumber = !streetNumber;

    return (
      <div className="address-input">
        <h3>Vul de betreffende postcode en huisnummer in:</h3>
        <form className="address-input__form" onSubmit={this.onFormSubmit}>
          <TextField
            className="address-input__input address-input__postcode"
            label="Postcode"
            onChange={this.onPostcodeInput}
            defaultValue={debug && '1055x'}
          />
          <TextField
            className="address-input__input address-input__streetnumber"
            label="Huisnummer + toevoeging"
            onInput={this.onStreetNumberInput}
            defaultValue={debug && '19'}
          />

          {validPostcode && (
            <div className="address-input__results">
              <h4 className="address-input__results__title">Adres:</h4>
              {streetnameLoading && <div>Laden....</div>}
              {!streetnameLoading && streetName && (
                <div className={'address-input__results__item'}>
                  {streetName} {streetNumber}
                </div>
              )}
            </div>
          )}

          {!loading && showError && (
            <div className="address-input__error">
              {postcode && notValidPostcode && (
                <p>
                  De ingevoerde postcode is niet goed geformuleerd. Een postcode bestaat uit 4 cijfers en 2 letters.
                </p>
              )}
              {notValidPostcodeAmsterdam && (
                <p>De ingevoerde postcode is niet gevonden in de Amsterdamse database. Probeer opnieuw.</p>
              )}
              {!postcode && <p>Voer een postcode in</p>}
              {notValidStreetNumber && <p>Voer een huisnummer in</p>}
              {notValidAddress && (
                <div>
                  <p className="address-input__feedback__incomplete">
                    Op de ingevoerde gegevens is geen adres gevonden.
                  </p>
                  {suggestions.length > 0 && (
                    <>
                      <div>Bedoel je misschien:</div>
                      {suggestions.map(suggestion => (
                        <div key={suggestion.label}>{suggestion.label}</div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          <Button className="address-input__submit">Bevestig</Button>
        </form>

        {streetNumber && loading && (
          <div>
            <h4>Laden...</h4>
            <div>De resultaten worden ingeladen.</div>
          </div>
        )}

        {validPostcode && !showError && monumentFetch && (
          <div>
            <h4>Monument:</h4>
            {monumentLoading && <div>Laden....</div>}
            {!monumentLoading && <div>Status: {monumentStatus || 'Geen monument'}</div>}
          </div>
        )}

        {validPostcode && !showError && bagFetch && (
          <div>
            <h4>Beschermd stadsgezicht:</h4>
            {bagLoading && <div>Laden....</div>}
            {!bagLoading && <div>Status: {bagStatus.isUnesco ? `Ja, ${bagStatus.isUnesco}` : 'Nee'}</div>}
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
    streetnameLoading,
    suggestionLoading,
    streetName,
    bagFetch,
    bagLoading,
    bagStatus,
    monumentFetch,
    monumentLoading,
    monumentStatus,
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
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onFetchBagData: fetchBagData,
      onfetchStreetname: fetchStreetname,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressInput);
