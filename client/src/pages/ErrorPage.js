import React from "react";

import Error from "../components/Error";
import Layout from "../components/Layouts/DefaultLayout";

const ErrorPage = ({ error }) => (
  <Layout>
    <Error error={error} />
  </Layout>
);

export default ErrorPage;
