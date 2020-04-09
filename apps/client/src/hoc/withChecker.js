import React, { useState, useEffect, useContext } from "react";
import Context from "../context";
import withTopic from "./withTopic";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import getChecker from "../sttr_client";

const dir = process.env.STTR_ENV === "production" ? "PROD" : "STAGING";

const withChecker = (Component) =>
  withTopic((props) => {
    const context = useContext(Context);
    const [checker, setChecker] = useState(context.checker);
    const [error, setError] = useState();

    useEffect(() => {
      if (!checker && !error) {
        fetch(`${window.location.origin}/sttr/${dir}/${props.topic.sttrFile}`)
          .then((response) => response.json())
          .then((json) => {
            const newChecker = getChecker(json);
            newChecker.next();
            context.checker = newChecker;
            setChecker(newChecker);
          })
          .catch((e) => {
            setError(e);
          });
      }
    });

    if (error) {
      console.error(error);
      return <ErrorPage error={error} {...props} />;
    } else if (checker) {
      return <Component checker={checker} {...props} />;
    } else {
      return <LoadingPage {...props} />;
    }
  });

export default withChecker;
