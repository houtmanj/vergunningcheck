import React, { useState } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { geturl, routes, getslug } from "../routes";
import { Helmet } from "react-helmet";

import withData from "../hoc/withData";
import Layout from "../components/Layouts/DefaultLayout";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Question, { booleanOptions } from "../components/Question";
import { Paragraph } from "@datapunt/asc-ui";

const QuestionsPage = ({ topic, checker, config }) => {
  const params = useParams();
  const history = useHistory();
  const [question, setQuestion] = useState(
    checker.stack[checker.stack.length - 1]
  );

  const { question: questionSlug } = params;
  const currSlug = getslug(question.text);

  // Update URL based on question text
  if (!questionSlug || questionSlug !== currSlug) {
    return (
      <Redirect
        to={geturl(routes.questions, {
          slug: topic.slug,
          question: currSlug
        })}
      />
    );
  }

  const { slug } = topic;

  const needContactPermits = () =>
    checker.permits.find(permit => {
      const conclusion = permit.getDecisionById("dummy");
      const conclusionMatchingRules = conclusion.getMatchingRules();
      return conclusionMatchingRules.find(
        rule => rule.outputValue === '"NeemContactOpMet"'
      );
    });

  const onQuestionNext = value => {
    if (question.options) {
      question.setAnswer(value);
    } else {
      const responseObj = booleanOptions.find(o => o.formValue === value);
      question.setAnswer(responseObj.value);
    }

    if (needContactPermits()) {
      history.push(geturl(routes.conclusion, { slug }));
    } else {
      let next;
      let done = false;
      while (!done) {
        next = checker.next();
        if (
          config.autofill.skipQuestions === false ||
          !next ||
          !next.autofill
        ) {
          done = true;
        }
      }

      if (!next) {
        // Go to Result page
        history.push(geturl(routes.results, { slug }));
      } else {
        // Go to Next question
        setQuestion(next);
      }
    }
  };

  const goBack = () => {
    // Go back to Location page
    // XXX fails for flows who dont have a location-page
    history.push(geturl(routes.address, { slug }));
  };

  const onQuestionPrev = () => {
    let prev;
    let done = false;
    while (!done) {
      if (checker?.stack?.length > 1) {
        goBack();
      }
      prev = checker.previous();
      if (config.autofill.skipQuestions === false || !prev || !prev.autofill) {
        done = true;
      }
    }
    if (!prev) {
      goBack();
    } else {
      setQuestion(prev);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>
          {topic.text.heading} - {question.text}
        </title>
      </Helmet>
      <Question
        flashMessage={
          config.autofill.flashMessage &&
          question.autofill && (
            <Paragraph style={{ padding: "1em", background: "orange" }}>
              Op basis van onze gegevens is het antwoord op deze vraag...
            </Paragraph>
          )
        }
        disableInputs={config.autofill.disableInputs && question.autofill}
        question={question}
        onSubmit={onQuestionNext}
        onGoToPrev={onQuestionPrev}
        showNext
        showPrev
        required
      />

      <DebugDecisionTable checker={checker} />
    </Layout>
  );
};

export default withData(QuestionsPage);
