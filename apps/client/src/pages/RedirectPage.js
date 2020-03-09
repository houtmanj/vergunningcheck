import React from "react";
import { Paragraph } from "@datapunt/asc-ui";
import { OLO } from "../config";
import Layout from "../components/Layouts/DefaultLayout";

const RedirectPage = () => {
  setTimeout(() => {
    window.open(OLO.intro, "_self");
  }, 5000);

  return (
    <Layout>
      <Paragraph>
        Uw wordt binnen enkele ogenblikken doorgestuurd naar het omgevingsloket.
      </Paragraph>
    </Layout>
  );
};

export default RedirectPage;
