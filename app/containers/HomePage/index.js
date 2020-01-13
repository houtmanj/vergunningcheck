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
import { Heading, Paragraph, List, ListItem, Link } from '@datapunt/asc-ui';
import history from 'utils/history';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, PAGES } from 'constants';

const HomePageText = () => (
  <>
    <Heading $as="h2">Inleiding</Heading>
    <Paragraph>
      Met de vergunningchecker ziet u of u een omgevingsvergunning nodig hebt. Als u alle vragen beantwoord heeft, geeft
      u dat inzicht waar u rekening mee moet houden.
    </Paragraph>
    <Heading $as="h3">Proclaimer</Heading>
    <Paragraph>
      Deze vergunningchecker is een product in ontwikkeling, het is onvolledig en er kunnen nog fouten in zitten. Komt u
      iets tegen wat niet correct is of beter kan, dan stellen wij uw reactie op prijs. U kunt ons dit laten weten door
      gebruik te maken van de feedbackknop aan de rechterkant van alle pagina&#39;s. Hieronder leest u in welke gevallen
      u de vergunningchecker kunt gebruiken.
    </Paragraph>
    <List variant="bullet">
      <ListItem>
        U kunt de vergunningchecker alleen gebruiken voor adressen die binnen het bestemmingsplangebied &#34;De Pijp
        2018&#34; vallen.
      </ListItem>
      <ListItem>
        U kunt de vergunningchecker alleen gebruiken voor <em>tussenwoningen</em>
      </ListItem>
      <ListItem>De vergunningchecker voldoet nog niet aan de Web Content Accessibilty Guidelines.</ListItem>
    </List>
    <Paragraph>
      Nog niet alle regels zijn in de vergunningchecker verwerkt. Een deel van de regels uit het Besluit Omgevingsrecht
      (Bor) is nog niet verwerkt:
    </Paragraph>
    <List variant="bullet">
      <ListItem>
        De vergunningchecker geldt op het moment alleen voor bouwwerken direct achter het hoofdgebouw. Bouwwerken op een
        afstand groter dan 4 meter achter de achtergevel zijn nog niet mogelijk binnen de vergunningchecker (artikel 2
        onderdeel 3 sub b van Bijlage II Bor).
      </ListItem>
      <ListItem>
        De regels over het toenemen van het aantal woningen, mantelzorg, illegale bouwwerken, veiligheidszones en
        archeologische monumentenzorg zijn nog niet meegenomen (artikel 5 van Bijlage II Bor).
      </ListItem>
      <ListItem>
        De regels over mantelzorg, inwendige scheidingsconstructie en functionele verbondenheid zijn nog niet meegenomen
        (artikel 7 van Bijlage II Bor).
      </ListItem>
    </List>
    <Paragraph>
      De precieze tekst van deze artikelen is te vinden in{' '}
      <Link
        href="https://wetten.overheid.nl/jci1.3:c:BWBR0027464&amp;bijlage=II&amp;z=2019-07-01&amp;g=2019-07-01"
        target="_blank"
      >
        Bijlage II bij het Besluit Omgevingsrecht
      </Link>
    </Paragraph>
  </>
);

const HomePage = () => (
  <>
    <HomePageText />
    <Form
      onSubmit={e => {
        e.preventDefault();
        history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.location}`);
      }}
    >
      <Navigation page="home" showNext />
    </Form>
  </>
);

export default HomePage;
