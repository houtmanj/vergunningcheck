import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

const reducer = (checker, updateChecker) => {
  if (checker === null) {
    return [];
  }
  return updateChecker;
};

const CheckerContext = createContext([]);

function CheckerProvider(props) {
  const [checker, updateChecker] = useReducer(reducer, []);

  return <CheckerContext.Provider value={{ checker, updateChecker }}>{props.children}</CheckerContext.Provider>;
}

CheckerProvider.propTypes = {
  children: PropTypes.node,
};

export { CheckerContext, CheckerProvider };
