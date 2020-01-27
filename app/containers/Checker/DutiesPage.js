import React from 'react';
import { Paragraph } from '@datapunt/asc-ui';

import history from 'utils/history';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, PAGES } from '../../constants';

const DutiesPage = () => (
  <Form
    onSubmit={e => {
      e.preventDefault();
    }}
  >
    <Paragraph strong>Dit is de plichten pagina</Paragraph>
    <Paragraph style={{ marginBottom: '0px' }}>Klaar ben je</Paragraph>

    <Navigation
      page={`checker-${PAGES.checkerDuties}`}
      onGoToPrev={() => history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerResult}`)}
      showPrev
      showNext
      nextText="Wat nu?"
      formEnds
    />
  </Form>
);

export default DutiesPage;
