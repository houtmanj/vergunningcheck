import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';
import { Paragraph, TextField } from '@datapunt/asc-ui';

import history from 'utils/history';
import { AddressResult, DebugData } from 'components/AddressInput';
import { Question } from 'components/Questionnaire';
import { fetchStreetname, fetchBagData } from './actions';

const StyledAddressInputErrors = styled(Paragraph)`
  color: red;
`;

const question = {
  id: 'location',
  vraagTekst: 'Waar wilt u uw aanbouw maken?',
};

const AddressInput = ({ streetNameLoading, bagLoading, onFetchBagData, streetName, onFetchStreetname }) => {
  const [loadingLocation, toggleLoadingLocation] = useState(false);
  const [suffix, addSuffix] = useState(null);

  const { clearError, errors, setError, setValue, register, getValues } = useForm({ mode: 'onChange' });

  const loading = streetNameLoading || bagLoading;
  const values = getValues();
  const allFieldsFilled = !loading && values.postalCode && values.streetNumber;
  const hasErrors = !loading && streetName.length === 0 && Object.entries(errors).length !== 0;
  const hasSuffix = streetName.length > 1;
  const hasSuffixNotFilled = hasSuffix && !suffix;

  register({ name: 'postalCode' });
  register({ name: 'streetNumber' });

  if (!loadingLocation && !hasErrors && allFieldsFilled) {
    onFetchStreetname(values);
    onFetchBagData(values);
    toggleLoadingLocation(!loadingLocation);
  }

  if (allFieldsFilled && streetName.length === 0) {
    setError(
      'validation',
      'notMatch',
      'De ingevoerde postcode is niet gevonden in de Amsterdamse database. Probeer opnieuw.',
    );
  }

  return (
    <>
      <Question
        question={question}
        showPrev
        showNext
        disableNext={!allFieldsFilled || hasErrors || hasSuffixNotFilled}
        onSubmit={() => history.push('/aanbouw/vragen')}
      >
        {hasErrors && <StyledAddressInputErrors>{errors?.validation?.message}</StyledAddressInputErrors>}
        <TextField
          className="address-input__input address-input__postcode"
          onChange={e => {
            if (e.target.value.length > 5) {
              if (e.target.value.match(/^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i)) {
                console.log('PERFECT!');
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
          }}
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
              Er bestaan meerdere adressen bij {streetName[0].straatnaam} {streetName[0].huisnummer}
            </Paragraph>
            <Paragraph>Toevoeging</Paragraph>
            <select
              onChange={e => {
                addSuffix(e.target.value);
                onFetchBagData({ postalCode: values.postalCode, streetNumber: e.target.value });
              }}
            >
              <option value="">Maak keuze</option>
              {streetName.map(house => (
                <option value={house.toevoeging} key={house.toevoeging}>
                  {house.toevoeging}
                </option>
              ))}
            </select>
          </>
        )}

        {(streetName.length === 1 || suffix) && (
          <>
            <Paragraph>Het door jou gekozen adres:</Paragraph>
            <Paragraph>
              {streetName[0].straatnaam} {suffix || streetName[0].huisnummer}
            </Paragraph>
            <Paragraph>
              {streetName[0].postcode} {streetName[0].woonplaats}
            </Paragraph>
          </>
        )}
        {loading && <AddressResult loading={loading} loadingText="De resultaten worden ingeladen." title="Laden..." />}
      </Question>
      {allFieldsFilled && loadingLocation && <DebugData />}
    </>
  );
};

AddressInput.propTypes = {
  streetName: PropTypes.any,
  streetNameLoading: PropTypes.bool,
  bagLoading: PropTypes.bool,
  onFetchStreetname: PropTypes.func.isRequired,
  onFetchBagData: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { streetNameLoading, streetName, bagFetch, bagLoading, bagStatus, noResults } = state.addressInput;
  return {
    streetNameLoading,
    streetName,
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
)(AddressInput);
