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
import { Heading, Paragraph, OrderedList, ListItem } from '@datapunt/asc-ui';
import history from 'utils/history';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, GET_TEXT, PAGES } from '../../constants';

const LocationIntroductionText = () => (
  <>
    <Heading $as="h3">Hoe werkt het?</Heading>
    <Paragraph gutterBottom={8}>U wilt weten of u een vergunning nodig hebt om {GET_TEXT?.topic}.</Paragraph>
    <OrderedList>
      <ListItem>u voert eerst het adres van het gebouw in</ListItem>
      <ListItem>u krijgt vervolgens informatie over het gebouw te zien.</ListItem>
      <ListItem>u gebruikt deze informatie om de vergunningcheck te doen op het Omgevingsloket.</ListItem>
    </OrderedList>
    <Paragraph>Wilt u direct een vergunning aanvragen dan kan dat ook op het Omgevingsloket.</Paragraph>
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
