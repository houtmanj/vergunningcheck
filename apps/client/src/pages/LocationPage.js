import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import withTopic from "../hoc/withTopic";

import { Paragraph, Heading } from "@datapunt/asc";

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
  const { clearError, errors, register, unregister, handleSubmit } = useForm();
  const { slug, text } = topic;

  useEffect(() => {
    if (!address) {
      register({ name: "suffix" }, { required: "Kies een toevoeging" });
    } else {
      clearError("suffix");
    }
    return () => unregister("suffix");
  }, [address, clearError, register, unregister]);

  const onSubmit = () => {
    if (address) {
      trackEvent({
        category: "postcode-input",
        action: `postcode - ${slug.replace("-", " ")}`,
        name: address.postalCode.substring(0, 4)
      });

      context.address = address;
      history.push(geturl(routes.address, { slug }));
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Invullen adres - {text.heading}</title>
      </Helmet>
      <Heading $as="h4">Invullen adres</Heading>
      <Paragraph>{text.locationIntro}.</Paragraph>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LocationFinder
          setAddress={setAddress}
          postalCode={context.address?.postalCode}
          houseNumberFull={context.address?.houseNumberFull}
          houseNumber={context.address?.houseNumberFull}
          errors={errors}
        />
        <Nav
          onGoToPrev={() => {
            context.address = address;
            history.push(geturl(routes.intro, { slug }));
          }}
          showPrev
          showNext
        />
      </Form>
    </Layout>
  );
};

export default withTopic(LocationPage);
