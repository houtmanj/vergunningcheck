/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Heading, Paragraph, List, ListItem } from '@datapunt/asc-ui';
import history from 'utils/history';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, GET_TEXT, PAGES } from '../../constants';

const LocationIntroductionText = () => (
  <>
    <Heading $as="h3">{GET_TEXT?.locationHeading}</Heading>
    <Paragraph gutterBottom={8}>Controleer hier:</Paragraph>
    <List variant="bullet">
      <ListItem>of het gebouw een monument is</ListItem>
      <ListItem>of het gebouw in een beschermd stads- of dorpsgezicht ligt</ListItem>
      <ListItem>binnen welke bestemmingsplannen uw activiteit valt</ListItem>
    </List>
    <Paragraph>
      Deze informatie heeft u nodig om het vervolg van de check te doen. Dit doet u op het landelijk omgevingsloket.
    </Paragraph>
  </>
);

const LocationIntroductionPage = () => (
  <>
    <Form
      onSubmit={e => {
        e.preventDefault();
        history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.location}`);
      }}
    >
      <LocationIntroductionText />
      <Navigation page="home" showNext />
    </Form>
  </>
);

export default LocationIntroductionPage;
