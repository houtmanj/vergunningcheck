/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { Heading, Paragraph } from '@datapunt/asc-ui';

const NotFoundPage = () => (
  <>
    <div>
      <Heading $as="h2">Deze pagina is niet gevonden.</Heading>
    </div>
    <div>
      <Paragraph>Helaas</Paragraph>
    </div>
  </>
);

export default NotFoundPage;
