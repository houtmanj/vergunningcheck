import React, { Suspense } from "react";
import Helmet from "react-helmet";

import { routes, geturl } from "../routes";
import withChecker from "../hoc/withChecker";
import withOloRedirect from "../hoc/withOloRedirect";

import Loading from "../components/Loading";
import Form from "../components/Form";
import Nav from "../components/Nav";
import Layout from "../components/Layouts/DefaultLayout";

const IntroPage = ({ topic }) => {
  const { text, intro } = topic;
  const Intro = React.lazy(() => import(`../intros/${intro}`));
  return (
    <Layout>
      <Helmet>
        <title>Inleiding - {text.heading}</title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Intro />
        <Form action={geturl(routes.questions, topic)}>
          <Nav showNext />
        </Form>
      </Suspense>
    </Layout>
  );
};

export default withOloRedirect(withChecker(IntroPage));
