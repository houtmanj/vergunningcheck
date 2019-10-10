import React from 'react';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';

import { Content, Overview } from 'components/Questionnaire';
import { condCheck, areAllCondTrue } from 'shared/services/questionnaire/conditions';
import { questionnaires } from 'shared/services/questionnaire/questionnaire';

const { dePijp2018: questionnaire } = questionnaires;
const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
`;

const Route = props => {
  const outcome = questionnaire.uitkomsten.filter(uitkomst =>
    areAllCondTrue(uitkomst.cond, props.route, questionnaire.uitvoeringsregels) ? uitkomst.label : false,
  );
  return (
    <StyledContent>
      <p>
        <strong>{outcome.length ? `Uitkomst: ${outcome[0].label}` : `Deze route heeft geen uitkomst!`}</strong>
        <br />
        {outcome.length && <em>Route: {outcome[0].cond.join(' > ')}</em>}
      </p>
      <Overview userAnswers={props.route} uitvoeringsregels={questionnaire.uitvoeringsregels} />
    </StyledContent>
  );
};
Route.propTypes = {
  route: PropTypes.object,
};

const generateAnswer = (key, o) => {
  const hasConditionAndFailed =
    key.cond && Array.isArray(key.cond) && !condCheck(key.cond, o, questionnaire.uitvoeringsregels);

  if (hasConditionAndFailed) return null;

  if (key.type === 'decision') {
    return key.antwoordOpties
      .filter(a => (a.cond ? condCheck(a.cond, o, questionnaire.uitvoeringsregels) : null))
      .map(a => a.value)[0];
  }

  return key.antwoordOpties[Math.floor(Math.random() * key.antwoordOpties.length)].value;
};

const QuestionRoutes = () => {
  const allRoutes = [];

  for (let i = 0; i < 1500; i += 1) {
    const randomAnswers = questionnaire.uitvoeringsregels.reduce(
      (o, key) => ({
        ...o,
        [key.id]: generateAnswer(key, o, questionnaire),
      }),
      {},
    );

    // remove child from randomAnswers
    // questionnaire.uitvoeringsregels.map(r => {
    //   if (r.child === true) {
    //     delete randomAnswers[r.id];
    //   }
    // });

    const contains = allRoutes.some(elem => JSON.stringify(randomAnswers) === JSON.stringify(elem.route));

    if (!contains) {
      allRoutes.push({ route: randomAnswers, key: allRoutes.length + 1 });
      // Break loop if all routes are found
      // if (allRoutes.length === questionnaire.uitkomsten.length) break;
    }
  }

  // ALL ROUTES OVERVIEW
  return (
    <>
      <h2>Totaal aantal routes: {allRoutes.length}</h2>
      {allRoutes.map(route => (
        <Route route={route.route} key={route.key} />
      ))}
    </>
  );
};

// QuestionRoutes.propTypes = {
//   route: PropTypes.object,
// };

export default QuestionRoutes;
