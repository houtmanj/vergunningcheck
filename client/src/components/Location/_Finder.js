import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import Loading from "./Loading";
import Teaser, {
  fragment as teaserFragment,
  fragmentName as teaserFragmentName
} from "./Teaser";

export const query = gql`
  fragment basicAddress on Address {
    id
    __typename
    streetName
    postalCode
    houseNumberFull
  }
  query zipcode($postalCode: String!, $houseNumber: String!) {
    findAddress(postalCode: $postalCode, houseNumberFull: $houseNumber) {
      exactMatch {
        ...basicAddress
        ...${teaserFragmentName}
      }
      matches {
        ...basicAddress
      }
    }
  }
  ${teaserFragment}
`;

const LocationFinder = ({ onChange, variables }) => {
  const { loading, error, data } = useQuery(query, { variables });
  if (error) throw new Error(error);
  if (loading) return <Loading />;

  const { exactMatch, matches } = data.findAddress;
  // onChange(exactMatch ? exactMatch : {});

  return (
    <>
      {!exactMatch && (
        <select>
          {matches.map(match => (
            <option value={match.houseNumberFull}>
              {match.houseNumberFull}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default LocationFinder;
