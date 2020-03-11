import React from "react";
import { List, ListItem, Heading } from "@datapunt/asc-ui";

export default ({ children }) => (
  <>
    <Heading $as="h3">Hoe werkt het?</Heading>
    {children}
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
