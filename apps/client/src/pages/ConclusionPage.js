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

const outcomes = {
  NEED_PERMIT: '"Vergunningplicht"',
  NEED_CONTACT: '"NeemContactOpMet"',
  PERMIT_FREE: '"Toestemmingsvrij"'
};
const ConclusionsPage = ({ topic, checker }) => {
  const history = useHistory();
  const { slug } = topic;

  // find conclusions we want to display to the user
  // if outcome = contact then we return an array of len = 1
  // otherwise we return the descriptions for different permits
  const displayConclusions = checker.permits.map(permit => {
    const dummyDecision = permit.getDecisionById("dummy");
    const matchingRules = dummyDecision.getMatchingRules();
    const outcome = permit.getOutputByDecisionId("dummy");

    return {
      outcome,
      title:
        outcome === outcomes.NEED_CONTACT
          ? "Neem contact op met de gemeente"
          : `${permit.name}: ${outcome}`,
      description: matchingRules[0].description
    };
  });

  const contactPermit = displayConclusions.find(
    ({ outcome }) => outcome === outcomes.NEED_CONTACT
  );
  const needsPermit = !!displayConclusions.find(
    ({ outcome }) => outcome === outcomes.NEED_PERMIT
  );

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
      <Form onSubmit={handleSubmit}>
        <Heading $as="h1">Conclusies</Heading>

        <Paragraph>
          Op basis van uw antwoorden vind u hieronder wat voor uw activiteit van
          toepassing is.
        </Paragraph>

        {(contactPermit || displayConclusions).map(({ title, description }) => (
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
          onGoToPrev={() => history.push(geturl(routes.results, { slug }))}
          showPrev
          showNext
          nextText={needsPermit ? "Naar het omgevingsloket" : "Opnieuw checken"}
          formEnds
        />
        <DebugDecisionTable checker={checker} />
      </Form>
    </Layout>
  );
};

export default withFinalChecker(ConclusionsPage);
