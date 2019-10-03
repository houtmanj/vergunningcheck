import { camelCase } from 'lodash';
import dePijp2018 from 'shared/content/aanbouw/de-pijp-2018';
import test from 'shared/content/aanbouw/test';
import basis from 'shared/content/aanbouw/basis';

export const questionnaires = {
  dePijp2018,
  test,
  basis,
};

function addIndexesToQuestionnaire(q) {
  let globalIndex = -1;

  const handleInput = (input, index) => ({ ...input, index });

  const handleDecision = (input, index) => ({
    ...input,
    index,
    group: addIndexes(input.group),
  });

  const handleElement = (elem, index) => {
    if (elem.type === 'input') {
      return handleInput(elem, index);
    }
    if (elem.type === 'decision') {
      return handleDecision(elem, index);
    }
    return null;
  };

  const addIndexes = r =>
    r.map(e => {
      globalIndex += 1;
      return handleElement(e, globalIndex);
    });

  return addIndexes(q);
}

const mapPlans = plans => {
  const planName = plan => camelCase(plan.text);
  // Check if plan is inside `questionnaires`
  const questionnaire = plans
    .filter(plan => questionnaires[planName(plan)])
    .map(plan => questionnaires[planName(plan)]);
  // Return indexed quesionnaire
  if (questionnaire.length > 0 && questionnaire[0].uitvoeringsregels) {
    return {
      ...questionnaire[0],
      uitvoeringsregels: addIndexesToQuestionnaire(questionnaire[0].uitvoeringsregels),
    };
  }
  return {};
};

export function receiveQuestionnaire(plan) {
  // Here we need to connect to the backend to receive a Questionnaire
  if (plan) {
    // For now we map the plans to the local files
    return mapPlans(plan);
  }
  return {};
}
