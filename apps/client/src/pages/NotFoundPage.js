import React from "react";
import { Heading, Paragraph } from "@datapunt/asc-ui";
import Layout from "../components/Layouts/DefaultLayout";
import Helmet from "react-helmet";
import withConfig from "../hoc/withConfig";

const NotFoundPage = () => (
  <Layout>
    <Helmet>
      <title>Pagina niet gevonden - Amsterdam Vergunningchecker</title>
    </Helmet>
    <Heading $as="h2">Deze pagina is niet gevonden.</Heading>
    <Paragraph>Helaas</Paragraph>
  </Layout>
);

export default withConfig(NotFoundPage);
