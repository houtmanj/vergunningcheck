import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paragraph, themeColor } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

import history from 'utils/history';
import { LocationResult, LocationData } from 'components/LocationData';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, PAGES, EXTERNAL_URLS } from '../../constants';
import { fetchStreetname, fetchBagData } from './actions';

const StyledAddressResult = styled(`div`)`
  padding: 30px;
  background-color: ${themeColor('tint', 'level3')};
`;

const LocationResultsPage = ({ addressResultsLoading, bagLoading, addressResults }) => {
  const loading = addressResultsLoading || bagLoading;

  if (!loading && addressResults?.length !== 1) {
    history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.location}`);
  }

  const goToOLO = e => {
    e.preventDefault();
    if (addressResults?.length === 1) {
      // Form is validated, we can proceed

      // Generate OLO parameter "postalCode"
      const oloPostalCode = `facet_locatie_postcode=${addressResults[0].postcode}`;

      // Generate OLO parameter "streetNumber"
      const oloStreetNumber = `facet_locatie_huisnummer=${addressResults[0].huisnummer}`;

      // Generate OLO parameter "suffix"
      const oloSuffixValue = addressResults[0].toevoeging.replace(addressResults[0].huisnummer, '').trim();

      const oloSuffix = `facet_locatie_huisnummertoevoeging=${oloSuffixValue}`;

      // Redirect user to OLO with all parameters
      window.open(
        `${EXTERNAL_URLS.oloChecker.location}?param=postcodecheck&${oloPostalCode}&${oloStreetNumber}&${oloSuffix}`,
        '_blank',
      );
    }
  };

  return (
    <>
      <Form onSubmit={goToOLO}>
        {loading && <LocationResult loading={loading} loadingText="De resultaten worden ingeladen." title="Laden..." />}

        {!loading && addressResults?.length === 1 && (
          <StyledAddressResult>
            <Paragraph strong style={{ marginBottom: '0px' }}>
              Dit is het gekozen adres:
            </Paragraph>
            <Paragraph>
              {addressResults[0].straatnaam} {addressResults[0].toevoeging}
              <br />
              {addressResults[0].postcode} {addressResults[0].woonplaats}
            </Paragraph>
            <LocationData />
          </StyledAddressResult>
        )}

        <Navigation
          page="location"
          onGoToPrev={() => history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.location}`)}
          nextText="Naar het omgevingsloket"
          showPrev
          showNext
        />
      </Form>
    </>
  );
};

LocationResultsPage.propTypes = {
  addressResults: PropTypes.any,
  addressResultsLoading: PropTypes.bool,
  bagLoading: PropTypes.bool,
};

const mapStateToProps = state => {
  const { addressResultsLoading, addressResults, bagLoading } = state.locationData;
  return {
    addressResultsLoading,
    addressResults,
    bagLoading,
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
)(LocationResultsPage);
