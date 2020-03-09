import React from "react";
import { Paragraph } from "@datapunt/asc-ui";

import Layout from "../components/Layouts/DefaultLayout";

const RedirectPage = () => {
  return (
    <Layout>
      <Paragraph>Uw wordt doorgestuurd naar het omgevingslokel.</Paragraph>
      <Paragraph>... XXX measure with matamo, do actual redirect ...</Paragraph>
    </Layout>
  );
};

export default RedirectPage;
