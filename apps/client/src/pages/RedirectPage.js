import React, { useEffect } from "react";
import { Paragraph } from "@datapunt/asc-ui";
import { OLO } from "../config";
import Layout from "../components/Layouts/DefaultLayout";

const RedirectPage = () => {
  useEffect(() => {
    const redirect = setTimeout(() => {
      window.open(OLO.intro, "_self");
    }, 5000);

    return () => {
      clearTimeout(redirect);
    };
  });

  return (
    <Layout>
      <Paragraph>
        Uw wordt binnen enkele ogenblikken doorgestuurd naar het omgevingsloket.
      </Paragraph>
    </Layout>
  );
};

export default RedirectPage;
