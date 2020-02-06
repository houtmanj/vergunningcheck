import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

const reducer = (checker, updateChecker) => {
  if (checker === null) {
    return [];
  }
  return updateChecker;
};

const QuestionContext = createContext([]);

function QuestionProvider(props) {
  const [question, setQuestion] = useReducer(reducer, []);

  return <QuestionContext.Provider value={{ question, setQuestion }}>{props.children}</QuestionContext.Provider>;
}

QuestionProvider.propTypes = {
  children: PropTypes.node,
};

export { QuestionContext, QuestionProvider };
