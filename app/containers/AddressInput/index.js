import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';
import history from 'utils/history';

import { Content, Answers } from 'components/Questionnaire';
import Navigation from 'components/Navigation';
import { AddressResult, AddressForm } from 'components/AddressInput/';
import { fetchStreetname, fetchBagData } from './actions';
import './style.scss';

const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

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
      debug: true,
    };
  }

  componentDidMount() {
    const { debug } = this.state;

    if (debug) {
      const postcode = document.querySelector('.address-input__postcode').value;
      this.setState({
        postcode,
        validPostcode: true,
      });
      setTimeout(() => this.onPostcodeInput({ target: { value: postcode } }), 1);
    }
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
    const {
      streetName,
      streetNameLoading,
      bagLoading,
      bagFetch,
      bagStatus,
      monumentStatus,
      monumentLoading,
      stadsgezichtStatus,
      stadsgezichtLoading,
      bestemmingsplanStatus,
      bestemmingsplanLoading,
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
      <StyledContent heading="Waar wilt u uw aanbouw maken?">
        <AddressForm onChange={this.onPostcodeInput} onInput={this.onStreetNumberInput} debug={debug} />
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
          <AddressResult loading={loading} loadingText="De resultaten worden ingeladen." title="Laden..." />
        )}
        {validPostcode && addressLine1 && !showError && (
          <>
            <AddressResult loading={streetNameLoading} title="Adres:">
              <div>{addressLine1}</div>
              <div>{addressLine2}</div>
              <div>{addressLine3}</div>
            </AddressResult>

            <StyledContent heading="Klopt dit adres?">
              <Answers
                questionId="location"
                answers={[
                  {
                    id: '1',
                    optieText: 'Ja',
                  },
                  {
                    id: '2',
                    optieText: 'Nee',
                  },
                ]}
                action={() => history.push('/aanbouw/vragen')}
                hideFooter
              />
            </StyledContent>
          </>
        )}

        <Navigation
          onGoToNext={() => this.setLocation('de pijp')}
          showNext
          disabledNext={!validPostcode || !addressLine1 || showError}
        />

        {validPostcode && addressLine1 && !showError && (
          <>
            <AddressResult loading={monumentLoading} title="Monument:">
              {monumentStatus ? `Ja. ${monumentStatus}` : 'Geen monument'}
            </AddressResult>

            <AddressResult loading={stadsgezichtLoading} title="Beschermd stadsgezicht:">
              {stadsgezichtStatus ? `Ja. ${stadsgezichtStatus}` : 'Geen beschermd stadsgezicht'}
            </AddressResult>

            <AddressResult loading={bestemmingsplanLoading} title="Ruimtelijke bestemmingsplannen:">
              {bestemmingsplanStatus.length === 0 && `Geen bestemmingsplan`}
              {bestemmingsplanStatus.length > 0 && (
                <ul>
                  {bestemmingsplanStatus.map(bestemmingsplan => (
                    <li key={bestemmingsplan.text}>{bestemmingsplan.text}</li>
                  ))}
                </ul>
              )}
            </AddressResult>
          </>
        )}
      </StyledContent>
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
  bestemmingsplanStatus: PropTypes.arrayOf(PropTypes.object),
  bestemmingsplanLoading: PropTypes.bool,
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
    stadsgezichtLoading,
    stadsgezichtStatus,
    bestemmingsplanLoading,
    bestemmingsplanStatus,
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
    stadsgezichtLoading,
    stadsgezichtStatus,
    bestemmingsplanLoading,
    bestemmingsplanStatus,
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
