import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@datapunt/asc-ui';
import history from 'utils/history';
import { getSttrFile } from 'shared/services/api';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, PAGES, GET_STTR } from '../../constants';
import getChecker from '../../shared/services/sttr_client';

const Question = ({ loading, sttrFile }) => {
  if (loading) {
    return <div>Laden....</div>;
  }

  return (
    <div>
      <Heading>ID: {sttrFile.id}</Heading>
    </div>
  );
};

Question.propTypes = {
  loading: PropTypes.bool,
  sttrFile: PropTypes.any,
};

const LocationIntroductionPage = () => {
  const [loading, setLoading] = useState(false);
  const [sttrFile, setSttrFile] = useState([]);

  useEffect(() => {
    (async function getSttr() {
      setLoading(true);
      const config = await getSttrFile(GET_STTR);

      console.log(config);
      console.log(getChecker(config));
      setSttrFile(config);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Form
        onSubmit={e => {
          e.preventDefault();
          history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.location}`);
        }}
      >
        <pre>{JSON.stringify(sttrFile)}</pre>
        <Question loading={loading} sttrFile={sttrFile} />
        <Navigation page="location-intro" showNext />
      </Form>
    </>
  );
};

export default LocationIntroductionPage;
