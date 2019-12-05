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
  const [toevoeging, addToevoeging] = useState(null);
  const loading = streetNameLoading || bagLoading;
  const { clearError, errors, setError, setValue, register, getValues } = useForm({ mode: 'onChange' });
  const values = getValues();
  const allFieldsFilled = values.postalCode && values.streetNumber;
  register({ name: 'postalCode' });
  register({ name: 'streetNumber' });

  if (!loadingLocation && Object.keys(errors).length === 0 && errors.constructor === Object && allFieldsFilled) {
    onFetchStreetname(values);
    onFetchBagData(values);
    toggleLoadingLocation(!loadingLocation);
  }

  return (
    <>
      <Question question={question} showPrev showNext onSubmit={() => history.push('/aanbouw/vragen')}>
        {!loading && errors && <StyledAddressInputErrors>{errors?.postalCode?.message}</StyledAddressInputErrors>}
        <TextField
          className="address-input__input address-input__postcode"
          onChange={e => {
            if (!e.target.value.match(/^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i)) {
              setError('postalCode', 'notMatch', 'Geen geldige postcode');
            } else {
              toggleLoadingLocation(false);
              setValue(e.target.name, e.target.value);
              clearError(e.target.name);
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
            toggleLoadingLocation(false);
            setValue(e.target.name, e.target.value);
            clearError(e.target.name);
          }}
          name="streetNumber"
          placeholder="bv. 1"
        />

        {streetName.length > 1 && (
          <>
            <Paragraph>
              Er bestaan meerdere adressen bij {streetName[0].straatnaam} {streetName[0].huisnummer}
            </Paragraph>
            <Paragraph>Toevoeging</Paragraph>
            <select
              onChange={e => {
                addToevoeging(e.target.value);
              }}
            >
              <option>Maak keuze</option>
              {streetName.map(house => (
                <option value={house.toevoeging} key={house.toevoeging}>
                  {house.toevoeging}
                </option>
              ))}
            </select>
          </>
        )}

        {(streetName.length === 1 || toevoeging) && (
          <>
            <Paragraph>Het door jou gekozen adres:</Paragraph>
            <Paragraph>
              {streetName[0].straatnaam} {toevoeging || streetName[0].huisnummer}
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
