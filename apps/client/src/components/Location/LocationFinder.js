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
  const [houseNumberFull, setHouseNumberFull] = useState(props.houseNumberFull);
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
        placeholder="bijv. 1074VE"
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
        placeholder="bijv. 1"
        errorMessage={validate("houseNumberFull", houseNumberFull, true)}
      />

      {loading && (
        <>
          <Paragraph strong>Laden...</Paragraph>
          <Paragraph>De resultaten worden ingeladen.</Paragraph>
        </>
      )}

      {error && <Error error={error} />}

      {exactMatch && <Teaser {...exactMatch} />}
      {postalCode &&
        houseNumberFull &&
        !loading &&
        !exactMatch &&
        matches.length === 0 && <p>Er is geen adres gevonden</p>}

      {postalCode &&
        houseNumberFull &&
        !loading &&
        !exactMatch &&
        matches.length > 0 && (
          <>
            <Paragraph strong>Kies een adres:</Paragraph>

            <Select
              label="Toevoeging"
              name="suffix"
              onChange={e => {
                setHouseNumberFull(e.target.value);
              }}
            >
              <option value="">Maak een keuze</option>
              {matches.map(match => (
                <option
                  value={match.houseNumberFull}
                  key={match.houseNumberFull}
                >
                  {match.houseNumberFull}
                </option>
              ))}
            </Select>
          </>
        )}
    </>
  );
  // }
};

export default LocationFinder;
