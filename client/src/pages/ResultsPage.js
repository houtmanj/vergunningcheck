import React from "react";
import { useHistory } from "react-router-dom";
import { Paragraph, Button } from "@datapunt/asc-ui";
import withFinalChecker from "../hoc/withFinalChecker";
import { routes, geturl, getslug } from "../routes";

import Layout from "../components/Layouts/DefaultLayout";
import Form from "../components/Form";
import Nav from "../components/Nav";
import DebugDecisionTable from "../components/DebugDecisionTable";
import { booleanOptions } from "../components/Question";
import {
  Wrapper,
  MainWrapper,
  Question,
  UserAnswer,
  UserResult,
  Change
} from "./ResultsPageStyles";

const ResultsPage = ({ topic, checker }) => {
  const history = useHistory();
  const { slug } = topic;
  const permitsPerQuestion = [];

  const onGoToQuestion = index => {
    const q = checker.rewindTo(index);
    history.push(
      geturl(routes.questions, {
        slug,
        question: getslug(q.text)
      })
    );
  };

  checker.permits.forEach(permit => {
    const conclusion = permit.getDecisionById("dummy");
    if (conclusion.getOutput() === '"Vergunningplicht"') {
      const decisiveDecisions = conclusion.getDecisiveInputs();
      decisiveDecisions.flatMap(decision => {
        decision.getDecisiveInputs().map(input => {
          const index = checker.stack.indexOf(input);
          permitsPerQuestion[index] = (permitsPerQuestion[index] || []).concat(
            permit
          );
          return true;
        });
      });
    }
  });

  // Something like this can be used to show the conclusions
  // const conclusions = checker?.permits.map(permit => {
  //   const decision = permit.getDecisionById('dummy');
  //   const rules = decision.getMatchingRules();
  //   return rules[0].description;
  // });

  return (
    <Layout>
      <Form
        onSubmit={e => {
          e.preventDefault();
          history.push(geturl(routes.conclusion, { slug }));
        }}
      >
        <Paragraph strong>
          Hieronder kunt u per vraag uw gegeven antwoord teruglezen en eventueel
          wijzigen. Als u een wijziging doet moet u alle volgende vragen opnieuw
          beantwoorden.
        </Paragraph>
        <MainWrapper>
          <Question>Vraag</Question>
          <UserAnswer>Uw antwoord</UserAnswer>
          <Change>Wijzig</Change>
        </MainWrapper>
        {checker?.stack?.map((question, index) => {
          const isDecisiveForPermits = permitsPerQuestion[index] || [];
          return (
            <div key={question.id}>
              <Wrapper>
                <Question>{question.text}</Question>
                {question.options ? (
                  <UserAnswer>
                    {question.answer.replace(/['"]+/g, "")}
                  </UserAnswer>
                ) : (
                  <UserAnswer>
                    {
                      booleanOptions.find(
                        option => option.value === question.answer
                      ).label
                    }
                  </UserAnswer>
                )}
                <Button
                  onClick={() => onGoToQuestion(index)}
                  variant="textButton"
                >
                  bewerken
                </Button>
              </Wrapper>
              {isDecisiveForPermits.map(permit => (
                <Wrapper>
                  <UserResult>
                    {" "}
                    Op basis van dit antwoord bent u vergunningsplichtig voor{" "}
                    {permit.name.replace("Conclusie", "").toLowerCase()}
                  </UserResult>
                </Wrapper>
              ))}
            </div>
          );
        })}
        <Nav
          onGoToPrev={() => onGoToQuestion(checker.stack.length - 1)}
          showPrev
          showNext
        />
        <DebugDecisionTable checker={checker} />
      </Form>
    </Layout>
  );
};

export default withFinalChecker(ResultsPage);
