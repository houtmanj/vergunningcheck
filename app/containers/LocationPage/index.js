import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from 'utils/history';
import { Heading, Paragraph, TextField, Select, themeColor } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

import { LocationResult, LocationData } from 'components/LocationData';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { fetchStreetname, fetchBagData } from './actions';
import { EXTERNAL_URLS, REGEX, GET_TEXT } from '../../constants';

const StyledAddressResult = styled(`div`)`
  padding: 30px;
  background-color: ${themeColor('tint', 'level3')};
`;

const LocationPage = ({ addressResultsLoading, bagLoading, onFetchBagData, addressResults, onFetchStreetname }) => {
  const [suffix, setSuffix] = useState(null);

  const {
    clearError,
    errors,
    setError,
    setValue,
    register,
    unregister,
    getValues,
    handleSubmit,
    triggerValidation,
  } = useForm();

  const loading = addressResultsLoading || bagLoading;
  const values = getValues();
  const allFieldsFilled = values.postalCode && values.streetNumber && !loading;

  register(
    { name: 'postalCode' },
    {
      required: 'Vul een postcode in',
      pattern: {
        value: REGEX.postalCode,
        message: 'De ingevoerde postcode is niet goed geformuleerd. Een postcode bestaat uit 4 cijfers en 2 letters.',
      },
    },
  );
  register({ name: 'streetNumber' }, { required: 'Vul een huisnummer in' });

  useEffect(() => {
    if (addressResults?.length > 1) {
      register({ name: 'suffix' }, { required: 'Kies een toevoeging' });
    }

    return () => unregister('suffix');
  }, [addressResults]);

  if (allFieldsFilled && !loading && (!addressResults || !addressResults.length)) {
    setError(
      'streetNumber',
      'notMatch',
      'Er is helaas geen adres in Amsterdam gevonden op basis van deze gegevens. Probeer het opnieuw.',
    );
  }

  const onSubmit = () => {
    if (addressResults?.length > 1 && !suffix) {
      // Needs suffix and has no suffix
      triggerValidation('suffix');
    }

    if (addressResults?.length === 1 || suffix) {
      // Form is validated, we can proceed

      const oloPostalCode = `facet_locatie_postcode=${values.postalCode}`;
      const olostreetNumber = `facet_locatie_huisnummer=${values.streetNumber}`;
      const oloSuffixValue = values.suffix ? values.suffix.replace(values.streetNumber, '').trim() : '';
      const oloSuffix = oloSuffixValue ? `facet_locatie_huisnummertoevoeging=${oloSuffixValue}` : '';

      // Redirect user to OLO
      window.open(
        `${EXTERNAL_URLS.oloChecker.location}?param=postcodecheck&${oloPostalCode}&${olostreetNumber}&${oloSuffix}`,
        '_blank',
      );
    }
  };

  const handleBlur = e => {
    // Trigger validation when user leaves the field
    if (e.target.value) triggerValidation({ name: e.target.name, value: e.target.value });
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setValue(name, value);
    clearError(['streetNumber', 'suffix']);
    setSuffix(null);

    // Trigger validation when user clears a field
    if (!value) triggerValidation({ name, value });

    const currentValues = getValues();

    if (currentValues.streetNumber && currentValues.postalCode && currentValues.postalCode.match(REGEX.postalCode)) {
      // Fields are validated
      onFetchStreetname(currentValues);
      onFetchBagData(currentValues);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading $as="h3">{GET_TEXT?.locationHeading}</Heading>
        <TextField
          className="address-input__input address-input__postcode"
          onChange={handleChange}
          onBlur={handleBlur}
          label="Postcode"
          name="postalCode"
          placeholder="bv. 1074VE"
          style={{ marginBottom: '20px' }}
          errorMessage={errors?.postalCode?.message}
        />
        <TextField
          className="address-input__input address-input__streetnumber"
          label="Huisnummer"
          onChange={handleChange}
          onBlur={handleBlur}
          name="streetNumber"
          placeholder="bv. 1"
          style={{ marginBottom: '20px' }}
          errorMessage={errors?.streetNumber?.message}
        />

        {addressResults?.length > 1 && (
          <>
            <Paragraph style={{ marginBottom: '20px' }}>
              Er bestaan meerdere adressen bij {addressResults[0].straatnaam} {addressResults[0].huisnummer}
            </Paragraph>
            <Select
              label="Toevoeging"
              name="suffix"
              errorMessage={errors?.suffix?.message}
              onChange={e => {
                setSuffix(e.target.value);
                setValue(e.target.name, e.target.value);
                onFetchBagData({ postalCode: values.postalCode, streetNumber: e.target.value });
              }}
              style={{ marginBottom: '20px' }}
            >
              <option value="">Maak een keuze</option>
              {addressResults.map(house => (
                <option value={house.toevoeging} key={house.toevoeging}>
                  {house.toevoeging}
                </option>
              ))}
            </Select>
          </>
        )}

        {loading && <LocationResult loading={loading} loadingText="De resultaten worden ingeladen." title="Laden..." />}

        {((!loading && addressResults?.length === 1) || suffix) && (
          <StyledAddressResult>
            <Paragraph strong style={{ marginBottom: '0px' }}>
              Dit is het gekozen adres:
            </Paragraph>
            <Paragraph>
              {addressResults[0].straatnaam} {suffix || addressResults[0].toevoeging}
              <br />
              {addressResults[0].postcode} {addressResults[0].woonplaats}
            </Paragraph>
            <LocationData />
            <Paragraph style={{ marginBottom: '0px' }}>
              Als u op Volgende klikt, dan wordt u doorgelinkt naar OLO.
            </Paragraph>
          </StyledAddressResult>
        )}

        <Navigation page="location" showNext />
      </Form>
    </>
  );
};

LocationPage.propTypes = {
  addressResults: PropTypes.any,
  addressResultsLoading: PropTypes.bool,
  bagLoading: PropTypes.bool,
  onFetchStreetname: PropTypes.func.isRequired,
  onFetchBagData: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { addressResultsLoading, addressResults, bagFetch, bagLoading, bagStatus, noResults } = state.locationData;
  return {
    addressResultsLoading,
    addressResults,
    bagFetch,
    bagLoading,
    bagStatus,
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
)(LocationPage);
