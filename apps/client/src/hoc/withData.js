import React, { useContext } from "react";
import withChecker from "./withChecker";
import getChecker from "../sttr_client";
import { uniqueFilter } from "../utils";
import Context from "../context";
import { routes, geturl } from "../routes";
import { useHistory } from "react-router-dom";

const withData = Component =>
  withChecker(props => {
    const history = useHistory();
    const { data } = useContext(Context);
    const { topic, checker } = props;

    const autofillMap = {
      monument: "address",
      cityScape: "address"
      // geo: 'map', // for trees ?
    };

    const questions = checker._getQuestions();

    const resolverRoutes = {
      address: routes.location
      // map: ...
    };

    // find one unfullfilled data need
    const next = questions.find(
      ({ autofill }) => !!autofill && data[autofillMap[autofill]] === undefined
    );
    if (next) {
      history.replace(
        geturl(resolverRoutes[autofillMap[next.autofill]], topic)
      );
      return null;
    }

    questions.map(question => {
      if (question.autofill === "monument") {
        question.setAnswer(
          !!data.address.restrictions.find(r => r.__typename === "Monument")
        );
      }
      if (question.autofill === "cityScape") {
        question.setAnswer(
          !!data.address.restrictions.find(r => r.__typename === "CityScape")
        );
      }
    });

    return <Component data={data} {...props} />;
  });

export default withData;
