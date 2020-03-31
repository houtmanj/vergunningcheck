import React, { useEffect } from "react";
import { Paragraph } from "@datapunt/asc-ui";
import { OLO } from "../config";
import Layout from "../components/Layouts/DefaultLayout";
import withConfig from "../hoc/withConfig";

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
    <Layout heading="Een ogenblik geduld alstublieft">
      <Paragraph>
        Wij sturen u automatisch door naar de website van het{" "}
        <a title="landelijke Omgevingsloket" href={OLO.intro}>
          landelijke Omgevingsloket
        </a>
        .
      </Paragraph>
    </Layout>
  );
};

export default withConfig(RedirectPage);
