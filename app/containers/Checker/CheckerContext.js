import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

const reducer = (stack, newStack) => {
  if (newStack === null) {
    localStorage.removeItem('stack');
    return [];
  }
  return [{ ...newStack }];
};

const localState = JSON.parse(localStorage.getItem('stack'));

const CheckerContext = React.createContext([]);

function CheckerProvider(props) {
  const [stack, newStack] = useReducer(reducer, localState || []);

  useEffect(() => {
    localStorage.setItem('stack', JSON.stringify(stack));
  }, [stack]);

  return <CheckerContext.Provider value={{ stack, newStack }}>{props.children}</CheckerContext.Provider>;
}

CheckerProvider.propTypes = {
  children: PropTypes.node,
};

export { CheckerContext, CheckerProvider };
