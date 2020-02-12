import React from 'react';
import { Heading, OrderedList, List, ListItem } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';
import history from 'utils/history';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, GET_TEXT, PAGES } from '../../constants';

const BulletList = styled(List)`
  li {
    list-style-type: none;
  }
  li:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #000000;
    left: -19px;
    top: 7px;
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
        <div>
          <BulletList variant="bullet">
            <ListItem>of het gebouw een monument is</ListItem>
            <ListItem>of het gebouw in een beschermd stads- of dorpsgezicht ligt</ListItem>
            <ListItem>welk bestemmingsplan er geldt</ListItem>
          </BulletList>
        </div>
      </ListItem>
      <ListItem>Daarna gebruikt u deze informatie om de vergunningcheck dakkapel te doen</ListItem>
      <ListItem>U leest of u een vergunning nodig hebt. Wij vertellen u hoe u een aanvraag doet</ListItem>
      <ListItem>Wij vertellen u waar u verder op moet letten als u de dakkapel gaat plaatsen.</ListItem>
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

const IntroductionPage = () => (
  <>
    <Form
      onSubmit={e => {
        e.preventDefault();
        history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerLocation}`);
      }}
    >
      <IntroductionText />
      <Navigation page={`checker-${PAGES.checkerIntroduction}`} showNext />
    </Form>
  </>
);

export default IntroductionPage;
