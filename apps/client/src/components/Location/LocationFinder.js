import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Paragraph, Select } from "@datapunt/asc-ui";
import { loader } from "graphql.macro";
import { StyledTextField } from "./LocationFinderStyles";
import Error from "../Error";
import Teaser from "./Teaser";

const findAddress = loader("./LocationFinder.graphql");

const postalCodeRegex = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i;

const LocationFinder = props => {
  const [postalCode, setPostalCode] = useState(props.postalCode);
  const [houseNumberFull, setHouseNumberFull] = useState(props.houseNumberFull);
  const [tempHouseNumber, setTempHouseNumber] = useState(props.houseNumberFull);
  const [touched, setTouched] = useState({});

  const { loading, error, data } = useQuery(findAddress, {
    variables: {
      postalCode,
      houseNumberFull
    },
    skip: !postalCode || !houseNumberFull
  });

  const { onChange } = props;
  const matches = data?.findAddress?.matches || [];
  const exactMatch = data?.findAddress?.exactMatch;
  const noAddressFound =
    postalCode &&
    houseNumberFull &&
    !loading &&
    !exactMatch &&
    matches.length === 0;
  const multipleAddessFound =
    postalCode && houseNumberFull && !loading && matches.length > 0;

  if (postalCode && houseNumberFull && !loading && (data || error)) {
    onChange(exactMatch);
  }

  const validate = (name, value, required) => {
    if (touched[name]) {
      if (required && (!value || value.trim() === "")) {
        return "Dit veld is verplicht.";
      }
      const trimmed = value.trim();
      if (name === "postalCode" && !trimmed.match(postalCodeRegex)) {
        return "De ingevoerde postcode is niet goed geformuleerd. Een postcode bestaat uit 4 cijfers en 2 letters.";
      }
    }
  };

  console.log(data);

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
        errorMessage={validate("postalCode", postalCode, true)}
      />
      <StyledTextField
        label="Huisnummer"
        onChange={e => {
          setHouseNumberFull(e.target.value);
        }}
        required={true}
        onBlur={handleBlur}
        defaultValue={houseNumberFull}
        name="houseNumberFull"
        errorMessage={
          noAddressFound
            ? "Er is helaas geen adres in Amsterdam gevonden op basis van deze gegevens. Probeer het opnieuw."
            : validate("houseNumberFull", houseNumberFull, true)
        }
      />

      {loading && (
        <>
          <Paragraph strong>Laden...</Paragraph>
          <Paragraph>De resultaten worden ingeladen.</Paragraph>
        </>
      )}

      {error && <Error error={error} />}

      {console.log(exactMatch?.houseNumberFull)}
      {console.log(matches[0]?.houseNumber)}
      {console.log("temp", tempHouseNumber)}
      {console.log(matches[0]?.houseNumber === exactMatch?.houseNumberFull)}
      {multipleAddessFound && (
        <>
          <Paragraph>
            Er bestaan meerdere adressen bij {matches[0]?.streetName}{" "}
            {matches[0]?.houseNumber}
          </Paragraph>

          <Select
            label="Toevoeging"
            name="suffix"
            onChange={e => {
              setTempHouseNumber(e.target.value);
            }}
          >
            <option value="">Maak een keuze</option>
            {matches.map((match, index) => (
              <option value={index} key={match.houseNumberFull}>
                {match.houseNumberFull}
              </option>
            ))}
          </Select>
        </>
      )}

      {(exactMatch || tempHouseNumber) && (
        <Teaser
          {...(exactMatch
            ? { ...exactMatch }
            : { ...matches[tempHouseNumber] })}
        />
      )}
    </>
  );
};

export default LocationFinder;
