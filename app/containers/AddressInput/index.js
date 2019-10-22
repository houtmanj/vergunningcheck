import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';
import history from 'utils/history';

import { Question, Answers } from 'components/Questionnaire';
import Navigation from 'components/Navigation';
import { AddressResult, AddressInputFields, AddressInputErrors } from 'components/AddressInput/';
import { isDevelopment } from 'shared/services/environment';
import { fetchStreetname, fetchBagData } from './actions';

const StyledAddressInputFields = styled(AddressInputFields)`
  max-width: 400px;
`;

const StyledAddressInputErrors = styled(AddressInputErrors)`
  color: red;
`;

class AddressInput extends React.Component {
  constructor(props) {
    super(props);
    this.onPostcodeInput = this.onPostcodeInput.bind(this);
    this.onStreetNumberInput = this.onStreetNumberInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateAddressInput = this.validateAddressInput.bind(this);
    this.state = {
      validPostcode: false,
      postcode: '',
      streetNumber: '',
      hasError: false,
      debug: true,
      answerValue: '',
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

  validateAddressInput() {
    const {
      streetName,
      noResults,
      bagFetch,
      bagStatus: { _display: addressLine1 },
    } = this.props;
    const { validPostcode, postcode, streetNumber, hasError } = this.state;

    const notValidPostcodeAmsterdam = validPostcode && !streetName;
    const notValidPostcode = !validPostcode || postcode.length !== 6;
    const notValidAddress = bagFetch && !addressLine1;
    const showError = hasError || notValidPostcodeAmsterdam || notValidAddress;

    if (!showError) return null;

    let error = '';

    if (noResults) error = `Op de ingevoerde gegevens is geen adres gevonden.`;

    if (notValidPostcodeAmsterdam)
      error = `De ingevoerde postcode is niet gevonden in de Amsterdamse database. Probeer opnieuw.`;

    if (!streetNumber) error = `Voer een huisnummer in`;

    if (postcode && notValidPostcode)
      error = `De ingevoerde postcode is niet goed geformuleerd. Een postcode bestaat uit 4 cijfers en 2 letters.`;

    if (!postcode) error = `Voer een postcode in`;

    return error;
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
      answerValue: '',
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
        answerValue: '',
      });

      return;
    }

    this.setState({
      hasError: true,
      answerValue: '',
    });
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      answerValue: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { bestemmingsplanStatus } = this.props;
    const { answerValue } = this.state;

    if (bestemmingsplanStatus.length > 0 && answerValue === 'true') {
      history.push('/aanbouw/vragen');
    } else {
      this.setState({
        hasError: true,
      });
    }
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
    } = this.props;

    const { validPostcode, postcode, streetNumber, hasError, debug } = this.state;

    const {
      _display: addressLine1,
      _gemeente: { _display: city },
    } = bagStatus;

    const loading = streetNameLoading || bagLoading;
    const showAddressResults = validPostcode && streetName && bagFetch && addressLine1;
    const addressLine2 = `${postcode.toUpperCase()} ${city}`;

    const inputError = this.validateAddressInput();

    return (
      <Question heading="Waar wilt u uw aanbouw maken?" onSubmit={this.handleSubmit}>
        {!loading && inputError && <StyledAddressInputErrors error={inputError} />}

        <StyledAddressInputFields onChange={this.onPostcodeInput} onInput={this.onStreetNumberInput} debug={debug} />

        {streetNumber && loading && (
          <AddressResult loading={loading} loadingText="De resultaten worden ingeladen." title="Laden..." />
        )}
        {showAddressResults && (
          <>
            {!inputError && hasError && <StyledAddressInputErrors error="Geef antwoord!" />}
            <AddressResult loading={streetNameLoading} title="Adres:">
              <div>{addressLine1}</div>
              <div>{addressLine2}</div>
            </AddressResult>

            <h3>Klopt dit adres?</h3>
            <Answers
              questionId="location"
              answers={[
                {
                  id: '1',
                  optieText: 'Ja',
                  value: 'true',
                },
                {
                  id: '2',
                  optieText: 'Nee',
                  value: 'false',
                },
              ]}
              onChange={this.handleChange}
              hideFooter
            />
          </>
        )}
        <Navigation showNext />

        {isDevelopment && (
          <>
            <AddressResult loading={monumentLoading} title="Voorbeeld postcodes:">
              <p>
                1074VE = De Pijp <br />
                1079VR = Rivierenbuurt
              </p>
            </AddressResult>

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
      </Question>
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
