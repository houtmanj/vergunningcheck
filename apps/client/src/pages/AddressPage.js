import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Paragraph } from "@datapunt/asc-ui";
import { geturl, routes } from "../routes";
import { OLO } from "../config";

import withAddress from "../hoc/withAddress";
import Layout from "../components/Layouts/DefaultLayout";
import AddressData from "../components/AddressData";
import Form from "../components/Form";
import Nav from "../components/Nav";

import { StyledAddressResult } from "./AddressPageStyles";

const getOloUrl = ({ postalCode, houseNumberFull, houseNumber }) => {
  // Form is validated, we can proceed

  // Generate OLO parameter "postalCode"
  const oloPostalCode = `facet_locatie_postcode=${postalCode}`;

  // Generate OLO parameter "streetNumber"
  const oloStreetNumber = `facet_locatie_huisnummer=${houseNumber}`;

  const oloSuffix = `facet_locatie_huisnummertoevoeging=${houseNumberFull
    .replace(houseNumber, "")
    .trim()}`;

  // Redirect user to OLO with all parameters
  return `${OLO.location}?param=postcodecheck&${oloPostalCode}&${oloStreetNumber}&${oloSuffix}`;
};

const AddressPage = ({ topic, address }) => {
  const history = useHistory();
  const { slug } = topic;
  const useSTTR = !!topic.sttrFile;

  const handleSubmit = e => {
    e.preventDefault();
    if (useSTTR) {
      history.push(geturl(routes.questions, { slug }));
    } else {
      window.open(getOloUrl(address), "_blank");
    }
  };
  return (
    <Layout>
      <Form onSubmit={handleSubmit}>
        <Paragraph>
          Over{" "}
          <strong>
            {address.streetName} {address.houseNumberFull}
          </strong>{" "}
          hebben we de volgende informatie gevonden:
        </Paragraph>

        <StyledAddressResult>
          <AddressData address={address} />
        </StyledAddressResult>

        {useSTTR ? (
          <>
            <Paragraph>{topic.text?.locationResultsPageDescription}</Paragraph>
            <Paragraph>
              Gaat u meer dan 1 {topic.text?.entity} plaatsen? Doe dan per{" "}
              {topic.text?.entity} de vergunningcheck.
            </Paragraph>
          </>
        ) : (
          <Paragraph>
            U hebt deze informatie nodig om de vergunningcheck te doen op het
            Omgevingsloket.
          </Paragraph>
        )}
        <Nav
          onGoToPrev={() => history.push(geturl(routes.location, { slug }))}
          nextText={!useSTTR ? "Naar het omgevingsloket" : undefined}
          showPrev
          showNext
        />
      </Form>
    </Layout>
  );
};

AddressPage.propTypes = {
  addressResults: PropTypes.any,
  addressResultsLoading: PropTypes.bool,
  bagLoading: PropTypes.bool
};

export default withAddress(AddressPage);
