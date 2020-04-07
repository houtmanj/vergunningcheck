import React from "react";
import { Paragraph } from "@datapunt/asc-ui";
import { StyledAddressResult } from "./TeaserStyles";

const LocationTeaser = ({
  streetName,
  postalCode,
  houseNumberFull,
  residence,
}) => (
  <StyledAddressResult>
    <Paragraph strong style={{ marginBottom: "0px" }}>
      Dit is het gekozen adres:
    </Paragraph>
    <Paragraph gutterBottom={0}>
      {streetName} {houseNumberFull}
      <br />
      {postalCode} {residence}
    </Paragraph>
  </StyledAddressResult>
);

export default LocationTeaser;
