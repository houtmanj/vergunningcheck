import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { searchForBestemmingsplan } from 'shared/services/auto-suggest/auto-suggest';
import {
  // Button,
  TextField,
} from '@datapunt/asc-ui';
import AddressInputResult from 'components/AddressInputResult';
import { fetchStreetname, fetchBagData } from './actions';
import './style.scss';

class AddressInput extends React.Component {
  constructor(props) {
    super(props);
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
    const { onFetchStreetname } = this.props;
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
      onFetchStreetname(postcode);
    }
  }

  onStreetNumberInput(event) {
    const { value: streetNumber } = event.target;

    this.setState({
      streetNumber,
    });

    const { onFetchBagData } = this.props;
    const { postcode, validPostcode } = this.state;

    if (postcode && streetNumber && validPostcode) {
      onFetchBagData(postcode, streetNumber);

      this.setState({
        hasError: false,
      });

      return;
    }

    this.setState({
      hasError: true,
    });
  }

  render() {
    searchForBestemmingsplan();
    const {
      streetName,
      streetNameLoading,
      bagLoading,
      bagFetch,
      bagStatus,
      monumentStatus,
      monumentLoading,
      beperkingStatus,
      beperkingLoading,
      stadsgezichtStatus,
      stadsgezichtLoading,
      noResults,
    } = this.props;

    const { validPostcode, postcode, streetNumber, hasError, debug } = this.state;

    const {
      _display: addressLine1,
      _gemeente: { _display: gemeente },
      _buurtcombinatie: { naam: buurtcombinatie },
      _gebiedsgerichtwerken: { naam: gebied },
    } = bagStatus;

    const loading = streetNameLoading || bagLoading;
    const notValidPostcodeAmsterdam = validPostcode && !streetName;
    const notValidAddress = bagFetch && !addressLine1;
    const showError = hasError || notValidPostcodeAmsterdam || notValidAddress;
    const notValidPostcode = !validPostcode || postcode.length !== 6;
    const notValidStreetNumber = !streetNumber;
    const addressLine2 = `${postcode.toUpperCase()} ${gemeente}`;
    const addressLine3 = `(${buurtcombinatie} ${buurtcombinatie && ':'} ${gebied})`;

    return (
      <div className="address-input">
        <h3>Vul de betreffende postcode en huisnummer in:</h3>
        <form className="address-input__form">
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
        </form>

        {!loading && showError && (
          <div className="address-input__error">
            {postcode && notValidPostcode && (
              <p>De ingevoerde postcode is niet goed geformuleerd. Een postcode bestaat uit 4 cijfers en 2 letters.</p>
            )}
            {notValidPostcodeAmsterdam && (
              <p>De ingevoerde postcode is niet gevonden in de Amsterdamse database. Probeer opnieuw.</p>
            )}
            {!postcode && <p>Voer een postcode in</p>}
            {notValidStreetNumber && <p>Voer een huisnummer in</p>}

            {noResults && (
              <div>
                <p className="address-input__feedback__incomplete">Op de ingevoerde gegevens is geen adres gevonden.</p>
              </div>
            )}
          </div>
        )}

        {streetNumber && loading && (
          <AddressInputResult loading={loading} loadingText="De resultaten worden ingeladen." title="Laden..." />
        )}

        {validPostcode && addressLine1 && !showError && (
          <>
            <AddressInputResult loading={streetNameLoading} title="Adres:">
              <div>{addressLine1}</div>
              <div>{addressLine2}</div>
              <div>{addressLine3}</div>
            </AddressInputResult>

            <AddressInputResult loading={monumentLoading} title="Monument:">
              {monumentStatus ? `Ja. ${monumentStatus}` : 'Geen monument'}
            </AddressInputResult>

            <AddressInputResult loading={stadsgezichtLoading} title="Beschermd stadsgezicht:">
              {stadsgezichtStatus ? `Ja. ${stadsgezichtStatus}` : 'Geen beschermd stadsgezicht'}
            </AddressInputResult>

            <AddressInputResult loading={beperkingLoading} title="Gemeentelijke beperkingen (WKPB):">
              {beperkingStatus.length === 0 && `Geen beperkingen`}
              {beperkingStatus.length > 0 && (
                <ul>
                  {beperkingStatus.map(beperking => {
                    const { _display: label, inschrijfnummer } = beperking;
                    return <li key={inschrijfnummer}>{label}</li>;
                  })}
                </ul>
              )}
            </AddressInputResult>
          </>
        )}
      </div>
    );
  }
}

AddressInput.defaultProps = {
  bagStatus: {
    geometrie: {},
    _display: '',
    _gemeente: {
      _display: '',
    },
    _buurtcombinatie: {
      naam: '',
    },
    _gebiedsgerichtwerken: {
      naam: '',
    },
  },
  monumentStatus: '',
  noResults: false,
};

AddressInput.propTypes = {
  streetName: PropTypes.string,
  streetNameLoading: PropTypes.bool,
  bagLoading: PropTypes.bool,
  bagFetch: PropTypes.bool,
  bagStatus: PropTypes.shape({
    _display: PropTypes.string,
    _buurtcombinatie: PropTypes.shape({
      naam: PropTypes.string,
    }),
    _gebiedsgerichtwerken: PropTypes.shape({
      naam: PropTypes.string,
    }),
    geometrie: PropTypes.object,
    _gemeente: PropTypes.object,
  }),
  monumentStatus: PropTypes.string,
  monumentLoading: PropTypes.bool,
  stadsgezichtStatus: PropTypes.string,
  stadsgezichtLoading: PropTypes.bool,
  beperkingStatus: PropTypes.arrayOf(PropTypes.object),
  beperkingLoading: PropTypes.bool,
  onFetchStreetname: PropTypes.func.isRequired,
  onFetchBagData: PropTypes.func.isRequired,
  noResults: PropTypes.bool,
};

const mapStateToProps = state => {
  const {
    streetNameLoading,
    streetName,
    bagFetch,
    bagLoading,
    bagStatus,
    monumentLoading,
    monumentStatus,
    beperkingLoading,
    beperkingStatus,
    stadsgezichtLoading,
    stadsgezichtStatus,
    noResults,
  } = state.addressInput;
  return {
    streetNameLoading,
    streetName,
    bagFetch,
    bagLoading,
    bagStatus,
    monumentLoading,
    monumentStatus,
    beperkingLoading,
    beperkingStatus,
    stadsgezichtLoading,
    stadsgezichtStatus,
    noResults,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onFetchBagData: fetchBagData,
      onFetchStreetname: fetchStreetname,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressInput);
