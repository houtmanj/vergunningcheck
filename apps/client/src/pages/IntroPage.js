import React, { Suspense } from "react";
import Helmet from "react-helmet";

import { routes, geturl } from "../routes";

import Loading from "../components/Loading";
import Form from "../components/Form";
import Nav from "../components/Nav";
import Layout from "../components/Layouts/DefaultLayout";
import withTopic from "../hoc/withTopic";

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

        <Form
          action={geturl(
            topic.sttrFile ? routes.questions : routes.location,
            topic
          )}
        >
          <Nav showNext />
        </Form>
      </Suspense>
    </Layout>
  );
};

export default withTopic(IntroPage);
