import React from 'react';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';

import { Content, Overview } from 'components/Questionnaire';
import { condCheck, areAllCondTrue } from 'shared/services/questionnaire/conditions';
import config from './config';

const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Route = props => {
  const outcome = config.uitkomsten
    .filter(uitkomst => (areAllCondTrue(uitkomst.cond, props.route, config.uitvoeringsregels) ? uitkomst.label : false))
    .map(uitkomst => uitkomst.label);
  return (
    <StyledContent>
      <p>{outcome.length ? `Uitkomst: ${outcome}` : <strong>Deze route heeft geen uitkomst!</strong>}</p>
      <Overview userAnswers={props.route} uitvoeringsregels={config.uitvoeringsregels} />
      <br />
    </StyledContent>
  );
};
Route.propTypes = {
  route: PropTypes.object,
};

const QuestionRoutes = () => {
  const allRoutes = [];

  for (let i = 0; i < 500; i += 1) {
    const randomAnswers = config.uitvoeringsregels.reduce((o, key) => {
      const hasConditionAndFailed =
        key.cond && Array.isArray(key.cond) && !condCheck(key.cond, o, config.uitvoeringsregels);
      const value = !hasConditionAndFailed
        ? key.antwoordOpties[Math.floor(Math.random() * key.antwoordOpties.length)].id
        : null;
      return {
        ...o,
        [key.id]: value,
      };
    }, {});

    const contains = allRoutes.some(elem => JSON.stringify(randomAnswers) === JSON.stringify(elem.route));

    if (!contains) {
      allRoutes.push({ route: randomAnswers, key: allRoutes.length + 1 });
      // Break loop if all routes are found
      if (allRoutes.length === config.uitkomsten.length) break;
    }
  }

  // ALL ROUTES OVERVIEW
  return allRoutes.map(route => <Route route={route.route} key={route.key} />);
};

// QuestionRoutes.propTypes = {
//   route: PropTypes.object,
// };

export default QuestionRoutes;
