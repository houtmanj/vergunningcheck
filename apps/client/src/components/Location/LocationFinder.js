import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Paragraph, Select } from "@datapunt/asc-ui";
import { loader } from "graphql.macro";
import { StyledTextField, StyledErrorParagraph } from "./LocationFinderStyles";
import Error from "../Error";
import Teaser from "./Teaser";

const findAddress = loader("./LocationFinder.graphql");
const postalCodeRegex = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i;

const LocationFinder = props => {
  const [postalCode, setPostalCode] = useState(props.postalCode);
  const [houseNumber, setHouseNumber] = useState(props.houseNumber);
  const [houseNumberFull, setHouseNumberFull] = useState(props.houseNumberFull);
  const [touched, setTouched] = useState({});

  // GraphQL query
  const { loading, error, data } = useQuery(findAddress, {
    variables: {
      postalCode,
      houseNumberFull,
      extraHouseNumberFull: houseNumber,
      queryExtra: houseNumber !== houseNumberFull
    },
    skip: !postalCode || !houseNumberFull || !houseNumber
  });

  const { onChange } = props;
  const exactMatch = data?.findAddress?.exactMatch;
  const findAddressMatches = data?.findAddress?.matches || [];
  const extraAddressMatches = data?.extraAddress?.matches || [];
  const addressMatches = extraAddressMatches.length
    ? extraAddressMatches
    : findAddressMatches.length > 1
    ? findAddressMatches
    : null;

  // Validate address
  const notFoundAddress =
    postalCode &&
    houseNumber &&
    houseNumberFull &&
    !loading &&
    !exactMatch &&
    !findAddressMatches.length;

  if (postalCode && houseNumberFull && !loading && (data || error)) {
    onChange(exactMatch);
  }

  // Validate forms
  const validate = (name, value, required) => {
    if (touched[name]) {
      if (required && (!value || value?.trim() === "")) {
        return "Dit veld is verplicht.";
      }
      const trimmed = value?.trim();
      if (name === "postalCode" && !trimmed.match(postalCodeRegex)) {
        return "De ingevoerde postcode is niet goed geformuleerd. Een postcode bestaat uit 4 cijfers en 2 letters.";
      }
    }
  };

  const handleBlur = e => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  return (
    <>
      <StyledTextField
        onChange={e => {
          setPostalCode(e.target.value);
        }}
        required={true}
        onBlur={handleBlur}
        label="Postcode"
        defaultValue={postalCode}
        name="postalCode"
        errorMessage={
          validate("postalCode", postalCode, true) || notFoundAddress
        }
      />
      <StyledTextField
        label="Huisnummer"
        onChange={e => {
          setHouseNumberFull(e.target.value);
          setHouseNumber(e.target.value);
        }}
        required={true}
        onBlur={handleBlur}
        defaultValue={houseNumberFull}
        name="houseNumberFull"
        errorMessage={
          validate("houseNumberFull", houseNumberFull, true) || notFoundAddress
        }
      />

      {notFoundAddress && (
        <StyledErrorParagraph>
          Er is geen adres in Amsterdam gevonden op basis van deze gegevens.
          Probeer het opnieuw.
        </StyledErrorParagraph>
      )}

      {postalCode && houseNumberFull && addressMatches && (
        <>
          <Paragraph>
            Er bestaan meerdere adressen bij {addressMatches[0]?.streetName}{" "}
            {addressMatches[0]?.houseNumber}
          </Paragraph>
          <Select
            label="Toevoeging"
            name="suffix"
            value={exactMatch?.houseNumberFull}
            onChange={e => {
              setHouseNumberFull(e.target.value);
              e.preventDefault();
            }}
            style={{ marginBottom: "24px" }}
            errorMessage={props.errors?.suffix?.message}
            required={true}
          >
            <option value={houseNumber}>Maak een keuze</option>
            {addressMatches.map(match => (
              <option value={match.houseNumberFull} key={match.houseNumberFull}>
                {match.houseNumberFull}
              </option>
            ))}
          </Select>
        </>
      )}

      {loading && (
        <>
          <Paragraph strong>Laden...</Paragraph>
          <Paragraph>De resultaten worden ingeladen.</Paragraph>
        </>
      )}

      {exactMatch && !loading && (
        <>
          <Teaser {...exactMatch} />
          <Paragraph>
            Klopt dit niet? Wijzig dan postcode of huisnummer.
          </Paragraph>
        </>
      )}

      {error && <Error error={error} />}
    </>
  );
  // }
};

export default LocationFinder;
