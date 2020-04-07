import React from "react";
import { ListItem, Heading, Paragraph } from "@datapunt/asc-ui";
import { StyledList } from "./Layouts/BaseLayoutStyles";

export default ({ children }) => (
  <>
    <Heading forwardedAs="h3">Hoe werkt het?</Heading>
    <Paragraph gutterBottom={8}>{children}</Paragraph>
    <StyledList variant="bullet">
      <ListItem>U voert eerst het adres van het gebouw in.</ListItem>
      <ListItem>
        Vervolgens krijgt u informatie over het gebouw te zien.
      </ListItem>
      <ListItem>
        U gebruikt deze informatie om de vergunningcheck te doen op het
        Omgevingsloket.
      </ListItem>
    </StyledList>
  </>
);
