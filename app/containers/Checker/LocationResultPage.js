import React, { useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paragraph, themeColor } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';
import slugify from 'slugify';
import { getSttrFile } from 'shared/services/api';
import history from 'utils/history';
import { LocationResult, LocationData } from 'components/LocationData';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, GET_TEXT, PAGES, GET_STTR } from '../../constants';
import { CheckerContext } from './CheckerContext';
import getChecker from '../../shared/services/sttr_client';
import { QuestionContext } from './QuestionContext';

const StyledAddressResult = styled(`div`)`
  margin-bottom: 24px;
  padding: 30px;
  border: 1px solid ${themeColor('tint', 'level3')};
`;

const LocationResultPage = ({ addressResultsLoading, bagLoading, addressResults }) => {
  const loading = addressResultsLoading || bagLoading;
  const { checker, updateChecker } = useContext(CheckerContext);
  const { setQuestion } = useContext(QuestionContext);

  if (!loading && (!addressResults || addressResults?.length !== 1)) {
    history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerQuestions}`);
    return null;
  }

  const goToQuestions = async e => {
    e.preventDefault();

    if (!checker.stack) {
      const config = await getSttrFile(GET_STTR);
      const initChecker = getChecker(config);
      const firstQuestion = initChecker.next();

      updateChecker(initChecker);
      setQuestion(firstQuestion);
      history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerQuestions}/${slugify(firstQuestion?.text?.toLowerCase())}`);
    } else {
      checker.rewindTo(0);
      // eslint-disable-next-line no-underscore-dangle
      const question = checker._last;
      history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerQuestions}/${slugify(question?.text?.toLowerCase())}`);
    }
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
                {addressResults[0]?.straatnaam} {addressResults[0]?.toevoeging}
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
  addressResults: PropTypes.array,
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
