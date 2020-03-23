import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Paragraph, Select } from "@datapunt/asc-ui";
import { loader } from "graphql.macro";
import { StyledTextField } from "./LocationFinderStyles";
import Error from "../Error";
import Teaser from "./Teaser";
// import debounce from "lodash-es/debounce";

const findAddress = loader("./LocationFinder.graphql");

const postalCodeRegex = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i;

const LocationFinder = props => {
  const [postalCode, setPostalCode] = useState(props.postalCode);
  const [houseNumber, setHouseNumber] = useState(props.houseNumber);
  const [houseNumberFull, setHouseNumberFull] = useState(props.houseNumberFull);
  const [touched, setTouched] = useState({});

  const { loading, error, data } = useQuery(findAddress, {
    variables: {
      postalCode,
      houseNumberFull,
      extraHouseNumberFull: houseNumber,
      queryExtra: houseNumber !== houseNumberFull
    },
    skip: !postalCode || !houseNumberFull
  });

  const { onChange } = props;
  const exactMatch = data?.findAddress?.exactMatch;

  const matches = data?.findAddress?.matches || [];
  const extraMatches = data?.extraAddress?.matches || [];
  const matchesToMap = extraMatches.length
    ? extraMatches
    : matches.length > 1
    ? matches
    : null;

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
          setHouseNumber(e.target.value);
        }}
        required={true}
        onBlur={handleBlur}
        defaultValue={houseNumberFull}
        name="houseNumberFull"
        errorMessage={validate("houseNumberFull", houseNumberFull, true)}
      />

      {postalCode &&
        houseNumberFull &&
        !loading &&
        !exactMatch &&
        matches.length === 0 && <p>Er is geen adres gevonden</p>}

      {postalCode && houseNumberFull && matchesToMap && (
        <>
          <Paragraph>
            Er bestaan meerdere adressen bij {matchesToMap[0]?.streetName}{" "}
            {matchesToMap[0]?.houseNumber}
          </Paragraph>
          <Select
            label="Kies een toevoeging"
            name="suffix"
            value={exactMatch?.houseNumberFull}
            onChange={e => {
              setHouseNumberFull(e.target.value);
              e.preventDefault();
            }}
            style={{ marginBottom: "24px" }}
          >
            <option value={houseNumber}>Maak een keuze</option>
            {matchesToMap.map(match => (
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
          {/* <Paragraph strong>Kies een adres:</Paragraph> */}
          <Teaser {...exactMatch} />
        </>
      )}

      {error && (
        <>
          <Error error={error} />
        </>
      )}
    </>
  );
  // }
};

export default LocationFinder;
