import React from "react";
import { Heading, Paragraph } from "@datapunt/asc-ui";
import Layout from "../components/Layouts/DefaultLayout";

const NotFoundPage = () => (
  <Layout>
    <Heading $as="h2">Deze pagina is niet gevonden.</Heading>
    <Paragraph>Helaas</Paragraph>
  </Layout>
);

export default NotFoundPage;
