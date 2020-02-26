import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import withTopic from "../hoc/withTopic";
import { Paragraph, Heading } from "@datapunt/asc-ui";

import Context from "../context";
import { geturl, routes } from "../routes";

import Layout from "../components/Layouts/DefaultLayout";
import Form from "../components/Form";
import Nav from "../components/Nav";
import LocationFinder from "../components/Location/LocationFinder";

const LocationPage = ({ topic }) => {
  const context = useContext(Context);
  const history = useHistory();
  const [address, setAddress] = useState(null);

  const { slug, text } = topic;
  const postalCode = context?.address?.postalCode;
  const houseNumberFull = context?.address?.houseNumberFull;

  const onSubmit = e => {
    e.preventDefault();
    if (address) {
      context.address = address;
      history.push(geturl(routes.address, { slug }));
    } else {
      alert("Selecteer eerst een adres aub.");
    }
  };

  console.log("rendder locatinopage with finder");
  return (
    <Layout>
      <Heading $as="h4">Invullen adres</Heading>
      <Paragraph>Voer het adres in waar u {text.topicLocation}.</Paragraph>
      <Form onSubmit={onSubmit}>
        <LocationFinder
          onChange={setAddress}
          postalCode={postalCode}
          houseNumberFull={houseNumberFull}
        />
        <Nav
          onGoToPrev={() => history.push(geturl(routes.intro, { slug }))}
          disableNext={!address}
          showPrev
          showNext
        />
      </Form>
    </Layout>
  );
};

export default withTopic(LocationPage);
