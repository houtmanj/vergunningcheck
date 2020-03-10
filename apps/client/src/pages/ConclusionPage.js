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

const uniqueFilter = (value, index, self) => self.indexOf(value) === index;

const outcomes = {
  NEED_PERMIT: '"Vergunningplicht"',
  NEED_CONTACT: '"NeemContactOpMet"',
  PERMIT_FREE: '"Toestemmingsvrij"'
};
const ConclusionsPage = ({ topic, checker }) => {
  const history = useHistory();
  const { slug } = topic;

  const needContact = !!checker.permits.find(
    permit => permit.getOutputByDecisionId("dummy") === outcomes.NEED_CONTACT
  );

  const needPermit = !!checker.permits.find(
    permit => permit.getOutputByDecisionId("dummy") === outcomes.NEED_PERMIT
  );

  // find conclusions we want to display to the user
  // if outcome = contact then we return an array of len = 1
  // otherwise we return the descriptions for different permits
  // const displayConclusions = checker.permits.reduce((acc, permit) => {
  //   const dummyDecision = permit.getDecisionById("dummy");
  //   const matchingRules = dummyDecision.getMatchingRules();

  //   if (permit.getOutputByDecisionId("dummy") === outcomes.NEED_CONTACT) {
  //     return [matchingRules[0].description];
  //   }
  //   acc.push(matchingRules.map(rule => rule.description));
  // }, []);

  // const iets = [{
  //   permitName: 'Dakkapel bouwen',
  //   title: 'Neem contact op met de gemeente'
  //   conclusion: outcomes.NEED_CONTACT,
  // },
  // {
  //   permitName: 'Dakkapel bouwen',
  //   conclusion: outcomes.NEED_PERMIT,
  //   conclusionText: 'U bent vergunningplichtig.'
  // }, {
  //   permitName: 'Dakkapel monument',
  //   conclusion: outcomes.PERMIT_FREE,
  //   conclusionText: 'U bent vrij...'
  // }]

  // const needsContact = !!iets.find(({conclusion}) = conclusion === outcomes.NEED_CONTACT);
  // const needsPermit = !!iets.find(({conclusion}) = conclusion === outcomes.NEED_PERMIT);

  const handleSubmit = e => {
    e.preventDefault();

    if (needPermit) {
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
        <Heading $as="h1">Conclusies</Heading>

        <Paragraph>
          Op basis van uw antwoorden vind u hieronder wat voor uw activiteit van
          toepassing is.
        </Paragraph>

        {/* {displayConclusions.map(conclusion => (
          <>
            <Heading $as="h2">{conclusion.title}</Heading>
            <ReactMarkdown
              source={conclusion.text}
              renderers={{ paragraph: Paragraph }}
              linkTarget="_blank"
            />
          </>
        )} */}

        <Nav
          onGoToPrev={() => history.push(geturl(routes.results, { slug }))}
          showPrev
          showNext
          nextText={needPermit ? "Naar het omgevingsloket" : "Opnieuw checken"}
          formEnds
        />
        <DebugDecisionTable checker={checker} />
      </Form>
    </Layout>
  );
};

export default withFinalChecker(ConclusionsPage);
