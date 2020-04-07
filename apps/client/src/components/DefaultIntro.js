import React from "react";
import { Heading, Paragraph } from "@datapunt/asc-ui";
import { StyledList, StyledListItem } from "./Layouts/BaseLayoutStyles";

export default ({ children }) => (
  <>
    <Heading forwardedAs="h3">Hoe werkt het?</Heading>
    <Paragraph gutterBottom={8}>{children}</Paragraph>
    <StyledList variant="bullet">
      <StyledListItem>
        U voert eerst het adres van het gebouw in.
      </StyledListItem>
      <StyledListItem>
        Vervolgens krijgt u informatie over het gebouw te zien.
      </StyledListItem>
      <StyledListItem>
        U gebruikt deze informatie om de vergunningcheck te doen op het
        Omgevingsloket.
      </StyledListItem>
    </StyledList>
  </>
);
