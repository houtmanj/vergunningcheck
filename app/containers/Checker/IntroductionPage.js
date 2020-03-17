import React from 'react';
import Helmet from 'react-helmet';
import { Heading, OrderedList, List, ListItem, Paragraph } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';
import history from 'utils/history';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, GET_TEXT, PAGES } from '../../constants';

const StyledList = styled(List)`
  margin-top: 5px;
  margin-bottom: 0;

  li {
    position: relative;
    list-style-type: none;
    counter-increment: unset;
  }
  li::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #000000;
    left: -19px;
    top: 8px;
    padding-right: 0;
  }
`;

const IntroductionText = () => (
  <>
    <Heading $as="h3">Hoe het werkt:</Heading>
    <OrderedList>
      <ListItem>U voert op de volgende pagina eerst het adres van het gebouw in.</ListItem>
      <ListItem>
        Vervolgens krijgt u te zien:
        <StyledList variant="bullet">
          <ListItem>of het gebouw een monument is.</ListItem>
          <ListItem>of het gebouw in een beschermd stads- of dorpsgezicht ligt.</ListItem>
          <ListItem>welk bestemmingsplan er geldt.</ListItem>
        </StyledList>
      </ListItem>
      <ListItem>Wij stellen u een aantal vragen over het gebouw en de {GET_TEXT?.entity}.</ListItem>
      <ListItem>U leest of u een vergunning nodig hebt. Wij vertellen u hoe u een aanvraag doet.</ListItem>
      <ListItem>Wij vertellen u waar u verder op moet letten als u de {GET_TEXT?.entity} gaat plaatsen.</ListItem>
    </OrderedList>
    <Heading $as="h4">Bijzondere situaties:</Heading>
    <List variant="bullet">
      <ListItem>
        {GET_TEXT?.locationPageIntro} Bel dan de gemeente op 14 020, maandag tot en met vrijdag van 08.00 uur tot 18.00
        uur
      </ListItem>
      <ListItem>
        Gaat u de woning splitsen in 2 of meer woningen? Bel dan de gemeente op 14 020, maandag tot en met vrijdag van
        08.00 uur tot 18.00 uur.
      </ListItem>
    </List>
  </>
);

const IntroductionTextDakraam = () => (
  <>
    <Paragraph gutterBottom={20}>
      U kunt de vergunningcheck gebruiken voor dakramen, daklichten en lichtstraten.
    </Paragraph>
    <Heading $as="h3">Hoe het werkt:</Heading>
    <OrderedList>
      <ListItem>U voert op de volgende pagina eerst het adres van het gebouw in.</ListItem>
      <ListItem>
        Vervolgens krijgt u te zien:
        <StyledList variant="bullet">
          <ListItem>of het gebouw een monument is.</ListItem>
          <ListItem>of het gebouw in een beschermd stads- of dorpsgezicht ligt.</ListItem>
          <ListItem>welk bestemmingsplan er geldt.</ListItem>
        </StyledList>
      </ListItem>
      <ListItem>Wij stellen u een aantal vragen over het gebouw en het dakraam.</ListItem>
      <ListItem>U leest of u een vergunning nodig hebt. Wij vertellen u hoe u een aanvraag doet.</ListItem>
      <ListItem>Wij vertellen u waar u verder op moet letten als u het dakraam gaat plaatsen.</ListItem>
    </OrderedList>

    <Heading $as="h4">Onderhoud:</Heading>
    <Paragraph>
      Gaat u een bestaand dakraam, daklicht of lichtstraat vervangen? Onderhoud is vergunningvrij als het nieuwe dakraam
      gelijk blijft aan het bestaande dakraam. Voorbeelden:
    </Paragraph>
    <List variant="bullet">
      <ListItem>de positie van het dakraam</ListItem>
      <ListItem>de maten van het dakraam</ListItem>
      <ListItem>de detaillering van het raamhout</ListItem>
      <ListItem>de kleur van het dakraam</ListItem>
    </List>
    <Paragraph>
      Het bestaande dakraam, daklicht of lichtstraat moet wel met vergunning of vergunningvrij geplaatst zijn.
    </Paragraph>

    <Heading $as="h4">Bijzondere situaties:</Heading>
    <List variant="bullet">
      <ListItem>
        Gaat u de woning splitsen in 2 of meer woningen? Bel dan de gemeente op 14 020, maandag tot en met vrijdag van
        08.00 uur tot 18.00 uur.
      </ListItem>
    </List>
  </>
);

const IntroductionPage = () => (
  <>
    <Helmet>
      <title>Inleiding - {GET_TEXT?.heading}</title>
    </Helmet>
    <Form
      onSubmit={e => {
        e.preventDefault();
        history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerLocation}`);
      }}
    >
      {GET_TEXT?.entity === 'dakraam' ? <IntroductionTextDakraam /> : <IntroductionText />}
      <Navigation page={`checker-${PAGES.checkerIntroduction}`} showNext />
    </Form>
  </>
);

export default IntroductionPage;
