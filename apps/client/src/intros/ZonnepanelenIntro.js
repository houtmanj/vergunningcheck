import React from "react";
import { Paragraph, Heading, List, ListItem } from "@datapunt/asc-ui";

export default () => (
  <>
    <Heading $as="h3">Hoe werkt het?</Heading>
    <Paragraph gutterBottom={8}>
      U wilt weten of u een vergunning nodig hebt om zonnepanelen of
      warmtecollectoren te plaatsen.
    </Paragraph>
    <List variant="bullet">
      <ListItem>U voert eerst het adres van het gebouw in.</ListItem>
      <ListItem>
        Vervolgens krijgt u informatie over het gebouw te zien.
      </ListItem>
      <ListItem>
        U gebruikt deze informatie om de vergunningcheck te doen op het
        Omgevingsloket.
      </ListItem>
    </List>
  </>
);
