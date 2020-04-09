import React, { useState } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { geturl, routes, getslug, autofillRoutes } from "../routes";
import { Helmet } from "react-helmet";

import withData from "../hoc/withData";
import Layout from "../components/Layouts/DefaultLayout";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Question, { booleanOptions } from "../components/Question";
import FlashMessage from "../components/FlashMessage";

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
          question: currSlug,
        })}
      />
    );
  }

  const { slug } = topic;

  const needContactPermits = () =>
    checker.permits.find((permit) => {
      const conclusion = permit.getDecisionById("dummy");
      const conclusionMatchingRules = conclusion.getMatchingRules();
      return conclusionMatchingRules.find(
        (rule) => rule.outputValue === '"NeemContactOpMet"'
      );
    });

  const onQuestionNext = (value) => {
    if (question.options) {
      question.setAnswer(value);
    } else {
      const responseObj = booleanOptions.find((o) => o.formValue === value);
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
    // Go back to Location page if needed or intropage otherwise
    const dataNeed = checker.getDataNeeds().shift();
    if (dataNeed) {
      history.push(geturl(autofillRoutes[dataNeed], { slug }));
    } else {
      history.push(geturl(routes.intro, { slug }));
    }
  };

  const onQuestionPrev = () => {
    let prev;
    let done = false;
    while (!done) {
      if (checker.stack.length === 1) {
        done = true;
      } else {
        prev = checker.previous();
        if (
          config.autofill.skipQuestions === false ||
          !prev ||
          !prev.autofill
        ) {
          done = true;
        }
      }
    }
    if (!prev) {
      goBack();
    } else {
      setQuestion(prev);
    }
  };
  const userOverrides = false; // XXX question.answer !== data[question.autofill map...] &&

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
            <>
              <FlashMessage type="warning">
                Op basis van onze gegevens hebben wij dit antwoord voor u
                ingevult. U kunt het antwoord evengoed wijzigen om te kijken wat
                voor effect dit... Klopt dit antwoord volgens u niet? Neem dan{" "}
                <a
                  href="https://www.amsterdam.nl/contact/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Contactgegevens en openingstijden"
                >
                  contact op
                </a>{" "}
                met uw gemeente.
              </FlashMessage>
              {userOverrides && (
                <FlashMessage type="danger">
                  U heeft deze vraag zelf overschreven...
                </FlashMessage>
              )}
            </>
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
