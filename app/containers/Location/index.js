import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';
import { Paragraph, TextField } from '@datapunt/asc-ui';

import history from 'utils/history';
import { AddressResult, DebugData } from 'components/AddressResult';
import { Question } from 'components/Questionnaire';
import { fetchStreetname, fetchBagData } from './actions';

const StyledAddressInputErrors = styled(Paragraph)`
  color: red;
`;

const question = {
  id: 'location',
  vraagTekst: 'Waar wilt u uw aanbouw maken?',
};

const LocationPage = ({ addressResultsLoading, bagLoading, onFetchBagData, addressResults, onFetchStreetname }) => {
  const [loadingLocation, toggleLoadingLocation] = useState(false);
  const [suffix, addSuffix] = useState(null);

  const { clearError, errors, setError, setValue, register, getValues } = useForm();

  const loading = addressResultsLoading || bagLoading || loadingLocation;
  const values = getValues();
  const allFieldsFilled = !loading && values.postalCode && values.streetNumber;
  const hasErrors = !loading && Object.entries(errors).length !== 0;
  const hasSuffix = addressResults?.length > 1;

  register({ name: 'postalCode' });
  register({ name: 'streetNumber' });

  if (allFieldsFilled) {
    onFetchStreetname(values);
    onFetchBagData(values);
    toggleLoadingLocation(!loadingLocation);
  }

  if (allFieldsFilled && !addressResults) {
    setError('validation', 'notMatch', 'Er is geen adres gevonden met deze postcode en huisnummer.');
  }

  const onSubmit = () => {
    if (allFieldsFilled && !hasErrors) {
      history.push('/aanbouw/vragen');
    }
  };

  const validatePostcode = e => {
    if (e.target.value.length > 5) {
      if (e.target.value.match(/^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i)) {
        toggleLoadingLocation(false);
        setValue(e.target.name, e.target.value);
        clearError('validation');
      } else {
        setError(
          'validation',
          'notMatch',
          'De ingevoerde postcode is niet goed geformuleerd. Een postcode bestaat uit 4 cijfers en 2 letters.',
        );
      }
    }
  };

  return (
    <>
      <Question question={question} showPrev showNext onSubmit={onSubmit}>
        {hasErrors && <StyledAddressInputErrors>{errors?.validation?.message}</StyledAddressInputErrors>}
        <TextField
          className="address-input__input address-input__postcode"
          onChange={validatePostcode}
          label="Postcode"
          name="postalCode"
          placeholder="bv. 1074VE"
        />
        <br />
        <TextField
          className="address-input__input address-input__streetnumber"
          label="Huisnummer"
          onChange={e => {
            addSuffix(null);
            toggleLoadingLocation(false);
            setValue(e.target.name, e.target.value);
            clearError('validation');
          }}
          name="streetNumber"
          placeholder="bv. 1"
        />

        {hasSuffix && (
          <>
            <Paragraph>
              Er bestaan meerdere adressen bij {addressResults[0].straatnaam} {addressResults[0].huisnummer}
            </Paragraph>
            <Paragraph>Toevoeging</Paragraph>
            <select
              onChange={e => {
                addSuffix(e.target.value);
                onFetchBagData({ postalCode: values.postalCode, streetNumber: e.target.value });
              }}
            >
              <option value="">Maak keuze</option>
              {addressResults.map(house => (
                <option value={house.toevoeging} key={house.toevoeging}>
                  {house.toevoeging}
                </option>
              ))}
            </select>
          </>
        )}

        {(addressResults?.length === 1 || suffix) && (
          <>
            <Paragraph>Het door jou gekozen adres:</Paragraph>
            <Paragraph>
              {addressResults[0].straatnaam} {addressResults[0].toevoeging}
            </Paragraph>
            <Paragraph>
              {addressResults[0].postcode} {addressResults[0].woonplaats}
            </Paragraph>
          </>
        )}
        {allFieldsFilled && (
          <AddressResult loading={loading} loadingText="De resultaten worden ingeladen." title="Laden..." />
        )}
      </Question>
      {allFieldsFilled && <DebugData />}
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
  const { addressResultsLoading, addressResults, bagFetch, bagLoading, bagStatus, noResults } = state.location;
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
