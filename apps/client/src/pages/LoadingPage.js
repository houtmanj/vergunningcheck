import React from "react";

import Loading from "../components/Loading";
import Layout from "../components/Layouts/BaseLayout";
import Helmet from "react-helmet";
import withConfig from "../hoc/withConfig";

const LoadingPage = () => (
  <Layout>
    <Helmet>
      <title>Laden... - Amsterdam Vergunningchecker</title>
    </Helmet>
    <Loading />
  </Layout>
);

export default withConfig(LoadingPage);
