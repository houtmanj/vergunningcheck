import React from "react";
import { Paragraph, Heading } from "@datapunt/asc-ui";

import ReactMarkdown from "react-markdown";
import Form from "../components/Form";
import Nav from "../components/Nav";
import DebugDecisionTable from "../components/DebugDecisionTable";
import withChecker from "../hoc/withChecker";
import { useHistory } from "react-router-dom";
import { geturl, routes } from "../routes";
import Layout from "../components/Layouts/DefaultLayout";

const uniqueFilter = (value, index, self) => self.indexOf(value) === index;

const ContactPage = ({ topic, checker }) => {
  const history = useHistory();
  const { slug } = topic;

  const onGoBack = () => {
    // checker.previous();
    history.push(geturl(routes.questions, { slug }));
  };

  return (
    <Layout>
      <Form
        onSubmit={() => {
          // updateChecker([]);
          checker.rewindTo(0);
          history.push(
            geturl(routes.location, { slug }) + "?resetChecker=true"
          );
        }}
      >
        <Heading $as="h1">Conclusie</Heading>

        <Paragraph>
          Op basis van uw antwoorden vind u hieronder wat voor uw activiteit van
          toepassing is.
        </Paragraph>

        {checker.permits.map(permit => {
          const conclusion = permit.getDecisionById("dummy");
          const conclusionMatchingRules = conclusion.getMatchingRules();
          const displayConclusions = conclusionMatchingRules
            .filter(rule => rule.outputValue === '"NeemContactOpMet"')
            .map(rule => rule.description)
            .filter(uniqueFilter);

          if (displayConclusions.length === 0) return false;
          return (
            <div key={permit.name}>
              <Heading $as="h2">Neem contact op met de gemeente</Heading>
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
          onGoToPrev={onGoBack}
          showPrev
          showNext
          nextText="Opnieuw checken"
          formEnds
        />
        <DebugDecisionTable checker={checker} />
      </Form>
    </Layout>
  );
};

export default withChecker(ContactPage);
