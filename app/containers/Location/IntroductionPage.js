import React from 'react';
import { Heading, Paragraph, List, ListItem } from '@datapunt/asc-ui';
import history from 'utils/history';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, GET_TEXT, PAGES } from '../../constants';

const LocationIntroductionText = () => (
  <>
    <Heading $as="h3">Hoe werkt het?</Heading>
    <Paragraph gutterBottom={8}>U wilt weten of u een vergunning nodig hebt om {GET_TEXT?.topic}.</Paragraph>
    <List variant="bullet">
      <ListItem>U voert eerst het adres van het gebouw in.</ListItem>
      <ListItem>Vervolgens krijgt u informatie over het gebouw te zien.</ListItem>
      <ListItem>U gebruikt deze informatie om de vergunningcheck te doen op het Omgevingsloket.</ListItem>
    </List>
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
      <Navigation page="location-intro" showNext />
    </Form>
  </>
);

export default LocationIntroductionPage;
