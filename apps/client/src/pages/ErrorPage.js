import React from "react";

import Error from "../components/Error";
import Layout from "../components/Layouts/DefaultLayout";
import Helmet from "react-helmet";
import withConfig from "../hoc/withConfig";

const ErrorPage = ({ error }) => (
  <Layout>
    <Helmet>
      <title>Er is een fout opgetreden - Amsterdam Vergunningchecker</title>
    </Helmet>
    <Error error={error} />
  </Layout>
);

export default withConfig(ErrorPage);
