import React, { useContext } from "react";
import withChecker from "./withChecker";
import Context from "../context";
import { geturl, autofillRoutes } from "../routes";
import { useHistory } from "react-router-dom";

const withData = (Component) =>
  withChecker((props) => {
    const history = useHistory();
    const { data } = useContext(Context);
    const { topic, checker } = props;

    const questions = checker._getQuestions();
    questions.forEach((question) => {
      if (data.address) {
        if (question.autofill === "monument") {
          question.setAnswer(
            !!data.address.restrictions.find((r) => r.__typename === "Monument")
          );
        }
        if (question.autofill === "cityScape") {
          question.setAnswer(
            !!data.address.restrictions.find(
              (r) => r.__typename === "CityScape"
            )
          );
        }
      }
    });

    const dataNeed = checker.getDataNeeds(true).shift();

    if (dataNeed) {
      history.replace(geturl(autofillRoutes[dataNeed], topic));
      return null;
    }

    return <Component data={data} {...props} />;
  });

export default withData;
