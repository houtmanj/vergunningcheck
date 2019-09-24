// import SHARED_CONFIG from '../shared-config/shared-config';
import { camelCase } from 'lodash';
import dePijp2018 from 'shared/content/aanbouw/de-pijp-2018';
import test from 'shared/content/aanbouw/test';

const questionnaires = {
  dePijp2018,
  test,
};

const properPlanName = plan => camelCase(plan.text);

const mapPlans = plans => {
  // Check if plan is inside `questionnaires`
  const hasPlan = plans
    .filter(planName => questionnaires[properPlanName(planName)])
    .map(planName => questionnaires[properPlanName(planName)]);
  if (hasPlan.length > 0) {
    return hasPlan[0];
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
