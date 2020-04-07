import React from "react";
import { Heading, Paragraph, OrderedList } from "@datapunt/asc-ui";
import {
  StyledList,
  StyledListItem,
} from "../components/Layouts/BaseLayoutStyles";
import ListInsideOrderedList from "../components/ListInsideOrderedList";

export default () => (
  <>
    <Paragraph gutterBottom={20}>
      U kunt deze vergunningcheck gebruiken voor dakramen, daklichten en
      lichtstraten.
    </Paragraph>
    <Heading forwardedAs="h3">Hoe het werkt:</Heading>
    <OrderedList>
      <StyledListItem>
        U voert op de volgende pagina eerst het adres van het gebouw in.
      </StyledListItem>
      <StyledListItem>
        Vervolgens krijgt u te zien:
        <ListInsideOrderedList variant="bullet">
          <StyledListItem>of het gebouw een monument is.</StyledListItem>
          <StyledListItem>
            of het gebouw in een beschermd stads- of dorpsgezicht ligt.
          </StyledListItem>
          <StyledListItem>welk bestemmingsplan er geldt.</StyledListItem>
        </ListInsideOrderedList>
      </StyledListItem>
      <StyledListItem>
        Wij stellen u een aantal vragen over het gebouw en het dakraam.
      </StyledListItem>
      <StyledListItem>
        U leest of u een vergunning nodig hebt. Wij vertellen u hoe u een
        aanvraag doet.
      </StyledListItem>
      <StyledListItem>
        Wij vertellen u waar u verder op moet letten als u het dakraam gaat
        plaatsen.
      </StyledListItem>
    </OrderedList>

    <Heading forwardedAs="h4">Onderhoud:</Heading>
    <Paragraph gutterBottom={12}>
      Gaat u een bestaand dakraam, daklicht of lichtstraat vervangen? Onderhoud
      is vergunningvrij als het nieuwe dakraam gelijk blijft aan het bestaande
      dakraam. Dit geldt niet voor een illegaal geplaatst dakraam. Voorbeelden
      van vergunningvrij onderhoud:
    </Paragraph>
    <StyledList variant="bullet">
      <StyledListItem>de positie van het dakraam blijft gelijk</StyledListItem>
      <StyledListItem>de maten van het dakraam blijft gelijk</StyledListItem>
      <StyledListItem>
        de detaillering van het raamhout blijft gelijk
      </StyledListItem>
      <StyledListItem>de kleur van het dakraam blijft gelijk</StyledListItem>
    </StyledList>

    <Heading forwardedAs="h4">Bijzondere situaties:</Heading>
    <StyledList variant="bullet">
      <StyledListItem>
        Gaat u de woning splitsen in 2 of meer woningen? Bel dan de gemeente op
        14 020, maandag tot en met vrijdag van 08.00 uur tot 18.00 uur.
      </StyledListItem>
    </StyledList>
  </>
);
