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

const uniqueFilter = (value, index, self) => self.indexOf(value) === index;

const ConclusionsPage = ({ topic, checker }) => {
  const history = useHistory();
  const { slug } = topic;

  const goToOLO = e => {
    e.preventDefault();
    window.open(OLO.home, "_blank");
  };

  return (
    <Layout>
      <Form onSubmit={goToOLO}>
        <Heading $as="h1">Conclusies</Heading>

        <Paragraph>
          Op basis van uw antwoorden vind u hieronder wat voor uw activiteit van
          toepassing is.
        </Paragraph>

        {checker.permits.map(permit => {
          const conclusionString = permit.getOutputByDecisionId("dummy");
          const conclusion = permit.getDecisionById("dummy");
          const conclusionMatchingRules = conclusion.getMatchingRules();
          const displayConclusions = conclusionMatchingRules
            .filter(rule => rule.outputValue !== '"NeemContactOpMet"')
            .map(rule => rule.description)
            .filter(uniqueFilter);

          return (
            <div key={permit.name}>
              <Heading $as="h2">
                {permit.name.replace("Conclusie", "")}: {conclusionString}
              </Heading>
              {displayConclusions.map(text => (
                <div key={text}>
                  <ReactMarkdown
                    source={text}
                    renderers={{ paragraph: Paragraph }}
                    linkTarget="_blank"
                  />
                </div>
              ))}
            </div>
          );
        })}

        <Nav
          onGoToPrev={() => history.push(geturl(routes.results, { slug }))}
          showPrev
          showNext
          nextText="Naar het omgevingsloket"
          formEnds
        />
        <DebugDecisionTable checker={checker} />
      </Form>
    </Layout>
  );
};

export default withFinalChecker(ConclusionsPage);
