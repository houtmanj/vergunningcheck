import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paragraph, themeColor } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

import history from 'utils/history';
import { LocationResult, LocationData } from 'components/LocationData';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, GET_TEXT, PAGES } from '../../constants';

const StyledAddressResult = styled(`div`)`
  margin-bottom: 24px;
  padding: 30px;
  border: 1px solid ${themeColor('tint', 'level3')};
`;

const LocationResultPage = ({ addressResultsLoading, bagLoading, addressResults }) => {
  const loading = addressResultsLoading || bagLoading;

  if (!loading && (!addressResults || addressResults?.length !== 1)) {
    history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerQuestions}`);
    return null;
  }

  const goToQuestions = e => {
    e.preventDefault();
    history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerQuestions}`);
  };

  return (
    <>
      <Form onSubmit={goToQuestions}>
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

        {!loading && (
          <>
            <Paragraph>{GET_TEXT?.locationResultsPageDescription}</Paragraph>
            <Paragraph>
              Gaat u meer dan 1 {GET_TEXT?.entity} plaatsen? Doe dan per {GET_TEXT?.entity} de vergunningcheck.
            </Paragraph>
          </>
        )}

        <Navigation
          page="location-results"
          onGoToPrev={() => history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.location}`)}
          showPrev
          showNext
        />
      </Form>
    </>
  );
};

LocationResultPage.propTypes = {
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

export default connect(mapStateToProps)(LocationResultPage);
