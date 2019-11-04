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
import history from 'utils/history';
import { Question } from 'components/Questionnaire';
import Navigation from 'components/Navigation';
import { Heading, Paragraph, List, ListItem, Link } from '@datapunt/asc-ui';

const HomePageText = () => (
  <>
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
      <ListItem>
        Nog niet alle regels zijn in de vergunningchekcer verwerkt. Maakt u gebruik van de checker, dan zult u ook de
        volgende bronnen moeten raadplegen:
      </ListItem>
      <List variant="bullet">
        <ListItem>
          De begrippen <em>achtererfgebied</em> en <i>bebouwingsgebied</i> uit Artikel 1.
        </ListItem>
        <ListItem>Artikel 2 onderdeel 3 sub b. Dit artikel gaat over bouwerken op een afstand groter dan 4m.</ListItem>
        <ListItem>
          Artikel 5. Dit artikel gaat onder andere over aantal woningen en mantelzorg, illegaal bouwwerk,
          veiligheidszones, archeologische monumentenzorg.
        </ListItem>
        <ListItem>
          Artikel 7. Dit artikel gaat onder andere over de inwendige scheidingsconstructie en functionele verbondenheid,
          mantelzorg.
        </ListItem>
        <ListItem>
          De tekst van deze artikelen is te vinden in{' '}
          <Link
            href="https://wetten.overheid.nl/jci1.3:c:BWBR0027464&amp;bijlage=II&amp;z=2019-07-01&amp;g=2019-07-01"
            target="_blank"
          >
            Bijlage II bij het Besluit Omgevingsrecht
          </Link>
        </ListItem>
      </List>
    </List>
  </>
);

const HomePage = () => (
  <Question heading="Inleiding" headingAs="h2" onSubmit={() => history.push('/aanbouw/locatie')}>
    <HomePageText />
    <Navigation showNext />
  </Question>
);

export default HomePage;
