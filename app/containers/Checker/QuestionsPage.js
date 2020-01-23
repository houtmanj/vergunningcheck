import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Paragraph } from '@datapunt/asc-ui';
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
      <Paragraph>Deze STTR gaan we nu afspelen: </Paragraph>
      <Paragraph strong>{sttrFile.id}</Paragraph>
    </div>
  );
};

Question.propTypes = {
  loading: PropTypes.bool,
  sttrFile: PropTypes.any,
};

const QuestionsPage = () => {
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
          history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerResult}`);
        }}
      >
        <pre>{JSON.stringify(sttrFile)}</pre>
        <Question loading={loading} sttrFile={sttrFile} />
        <Navigation
          page={`checker-${PAGES.checkerQuestions}`}
          onGoToPrev={() => history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerLocation}`)}
          showPrev
          showNext
        />
      </Form>
    </>
  );
};

export default QuestionsPage;
