import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import withTopic from "../hoc/withTopic";
import { Paragraph, Heading } from "@datapunt/asc-ui";

import Context from "../context";
import { geturl, routes } from "../routes";
import { useMatomo } from "@datapunt/matomo-tracker-react";

import Layout from "../components/Layouts/DefaultLayout";
import Form from "../components/Form";
import Nav from "../components/Nav";
import LocationFinder from "../components/Location/LocationFinder";
import Helmet from "react-helmet";

const LocationPage = ({ topic }) => {
  const { trackEvent } = useMatomo();
  const context = useContext(Context);
  const history = useHistory();
  const [address, setAddress] = useState(null);

  const { slug, text } = topic;

  const onSubmit = e => {
    e.preventDefault();
    if (address) {
      trackEvent({
        category: "location",
        action: "postcode",
        name: slug,
        value: address.postalCode.substring(0, 4)
      });

      context.address = address;
      history.push(geturl(routes.address, { slug }));
    } else {
      alert("Selecteer eerst een adres aub.");
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Invullen adres - {text.heading}</title>
      </Helmet>
      <Heading $as="h4">Invullen adres</Heading>
      <Paragraph>{text.locationIntro}.</Paragraph>
      <Form onSubmit={onSubmit}>
        <LocationFinder
          onChange={setAddress}
          postalCode={context.address?.postalCode}
          houseNumberFull={context.address?.houseNumberFull}
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
