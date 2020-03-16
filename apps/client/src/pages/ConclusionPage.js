import React from "react";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Paragraph, Heading } from "@datapunt/asc-ui";
import { geturl, routes } from "../routes";
import { OLO } from "../config";
import withFinalChecker from "../hoc/withFinalChecker";

import Layout from "../components/Layouts/DefaultLayout";
import Form from "../components/Form";
import Nav from "../components/Nav";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Helmet from "react-helmet";

const outcomes = {
  NEED_PERMIT: '"Vergunningplicht"',
  NEED_CONTACT: '"NeemContactOpMet"',
  PERMIT_FREE: '"Toestemmingsvrij"'
};
const ConclusionsPage = ({ topic, checker }) => {
  const history = useHistory();
  const { slug } = topic;

  // find conclusions we want to display to the user
  const conclusions = checker.permits
    .filter(permit => !!permit.getOutputByDecisionId("dummy"))
    .map(permit => {
      const outcome = permit.getOutputByDecisionId("dummy");
      const dummyDecision = permit.getDecisionById("dummy");
      const matchingRules = dummyDecision.getMatchingRules();

      return {
        outcome,
        title:
          outcome === outcomes.NEED_CONTACT
            ? "Neem contact op met de gemeente"
            : `${permit.name}: ${outcome.replace(/['"]+/g, "")}`,
        description: matchingRules[0].description
      };
    });

  const needsPermit = !!conclusions.find(
    ({ outcome }) => outcome === outcomes.NEED_PERMIT
  );
  const contactConclusion = conclusions.find(
    ({ outcome }) => outcome === outcomes.NEED_CONTACT
  );
  const displayConclusions = contactConclusion
    ? [contactConclusion]
    : conclusions;

  const previousUrl = contactConclusion
    ? geturl(routes.questions, { slug })
    : geturl(routes.results, { slug });

  const handleSubmit = e => {
    e.preventDefault();
    if (needsPermit) {
      window.open(OLO.home, "_blank");
    } else {
      history.push(geturl(routes.intro, { slug }) + "?resetChecker=true");
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Conclusie - {topic.text.heading}</title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <Heading $as="h1">Conclusie</Heading>

        <Paragraph>
          Op basis van uw antwoorden vind u hieronder wat voor uw activiteit van
          toepassing is.
        </Paragraph>

        {displayConclusions.map(({ title, description }) => (
          <>
            <Heading $as="h2">{title}</Heading>
            <ReactMarkdown
              source={description}
              renderers={{ paragraph: Paragraph }}
              linkTarget="_blank"
            />
          </>
        ))}

        <Nav
          onGoToPrev={() => history.push(previousUrl)}
          showPrev
          showNext
          nextText={needsPermit ? "Naar het omgevingsloket" : "Begin opnieuw"}
          formEnds
        />
        <DebugDecisionTable checker={checker} />
      </Form>
    </Layout>
  );
};

export default withFinalChecker(ConclusionsPage);
