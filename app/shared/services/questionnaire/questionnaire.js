import camelCase from 'lodash.camelcase';
import dePijp2018 from 'shared/content/aanbouw/de-pijp-2018';
import rivierenbuurt from 'shared/content/aanbouw/rivierenbuurt';
import media from 'shared/content/aanbouw/media';

export const questionnaires = {
  dePijp2018,
  rivierenbuurt,
  media,
};

const addIndexToQuestions = q => q.map((i, index) => ({ ...i, index }));

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
      uitvoeringsregels: addIndexToQuestions(questionnaire[0].uitvoeringsregels),
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
