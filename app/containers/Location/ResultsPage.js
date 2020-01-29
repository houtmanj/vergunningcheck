import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paragraph, themeColor } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

import history from 'utils/history';
import { LocationResult, LocationData } from 'components/LocationData';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, PAGES, EXTERNAL_URLS } from '../../constants';

const StyledAddressResult = styled(`div`)`
  margin-bottom: 24px;
  padding: 30px;
  border: 1px solid ${themeColor('tint', 'level3')};
`;

const LocationResultsPage = ({ addressResultsLoading, bagLoading, addressResults }) => {
  const loading = addressResultsLoading || bagLoading;

  if (!loading && (!addressResults || addressResults?.length !== 1)) {
    history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.location}`);
    return null;
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

        {!loading && (
          <>
            <Paragraph>
              Over{' '}
              <strong>
                {addressResults[0].straatnaam} {addressResults[0].toevoeging}
              </strong>{' '}
              hebben we de volgende informatie gevonden:
            </Paragraph>
          </>
        )}

        <StyledAddressResult>
          <LocationData />
        </StyledAddressResult>

        <Paragraph>U hebt deze informatie nodig om de vergunningcheck te doen op het Omgevingsloket.</Paragraph>

        <Navigation
          page="location-results"
          onGoToPrev={() => history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.location}`)}
          nextText="Naar het omgevingsloket"
          showPrev
          showNext
          formEnds
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

export default connect(mapStateToProps)(LocationResultsPage);
