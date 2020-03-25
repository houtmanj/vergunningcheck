import React from "react";
import {
  Heading,
  OrderedList,
  List,
  ListItem,
  Paragraph
} from "@datapunt/asc-ui";
import ListInsideOrderedList from "../components/ListInsideOrderedList";

export default () => (
  <>
    <Paragraph gutterBottom={20}>
      U kunt deze vergunningcheck gebruiken voor dakramen, daklichten en
      lichtstraten.
    </Paragraph>
    <Heading $as="h3">Hoe het werkt:</Heading>
    <OrderedList>
      <ListItem>
        U voert op de volgende pagina eerst het adres van het gebouw in.
      </ListItem>
      <ListItem>
        Vervolgens krijgt u te zien:
        <ListInsideOrderedList variant="bullet">
          <ListItem>of het gebouw een monument is.</ListItem>
          <ListItem>
            of het gebouw in een beschermd stads- of dorpsgezicht ligt.
          </ListItem>
          <ListItem>welk bestemmingsplan er geldt.</ListItem>
        </ListInsideOrderedList>
      </ListItem>
      <ListItem>
        Wij stellen u een aantal vragen over het gebouw en het dakraam.
      </ListItem>
      <ListItem>
        U leest of u een vergunning nodig hebt. Wij vertellen u hoe u een
        aanvraag doet.
      </ListItem>
      <ListItem>
        Wij vertellen u waar u verder op moet letten als u het dakraam gaat
        plaatsen.
      </ListItem>
    </OrderedList>

    <Heading $as="h4">Onderhoud:</Heading>
    <Paragraph gutterBottom={12}>
      Gaat u een bestaand dakraam, daklicht of lichtstraat vervangen? Onderhoud
      is vergunningvrij als het nieuwe dakraam gelijk blijft aan het bestaande
      dakraam. Dit geldt niet voor een illegaal geplaatst dakraam. Voorbeelden
      van vergunningvrij onderhoud:
    </Paragraph>
    <List variant="bullet" style={{ marginBottom: "8px" }}>
      <ListItem>de positie van het dakraam blijft gelijk</ListItem>
      <ListItem>de maten van het dakraam blijft gelijk</ListItem>
      <ListItem>de detaillering van het raamhout blijft gelijk</ListItem>
      <ListItem>de kleur van het dakraam blijft gelijk</ListItem>
    </List>

    <Heading $as="h4">Bijzondere situaties:</Heading>
    <List variant="bullet">
      <ListItem>
        Gaat u de woning splitsen in 2 of meer woningen? Bel dan de gemeente op
        14 020, maandag tot en met vrijdag van 08.00 uur tot 18.00 uur.
      </ListItem>
    </List>
  </>
);
