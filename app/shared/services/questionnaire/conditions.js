export const condCheck = (cond, userAnswers, questionnaire) =>
  cond.some(condition =>
    // Check if condition has multiple conditions
    Array.isArray(condition)
      ? areAllCondTrue(condition, userAnswers, questionnaire)
      : isCondTrue(condition, userAnswers, questionnaire),
  );

export const isCondTrue = (condition, userAnswers, questionnaire) => {
  // Check if one condition is true
  if (typeof condition === 'string') {
    // return cond.some(condition => {
    const conditionQuestion = condition.split('.')[0];
    const conditionAnswerText = condition.split('.')[1].toLowerCase();
    // .replace(/['"]+/g, '');

    const conditionQuestionData = questionnaire.filter(q => q.id === conditionQuestion);

    // if conditionQuestion exists is datafile && user has already answered
    if (conditionQuestionData.length === 1 && userAnswers[conditionQuestion]) {
      const userAnswerId = userAnswers[conditionQuestion];
      const userAnswer = conditionQuestionData[0].antwoordOpties
        .filter(antwoord => antwoord.value === userAnswerId)
        .map(antwoord => antwoord.value);
      const userAnswerText = userAnswer.toString().toLowerCase();
      // if conditionAnswer is the same as answeredQuestion
      return conditionAnswerText === userAnswerText;
    }
    return false;
  }
  return false;
};

export const areAllCondTrue = (cond, userAnswers, questionnaire) =>
  // Check if every condition is true
  cond.every(condition => {
    const conditionQuestion = condition.split('.')[0];
    const conditionAnswerText = condition.split('.')[1].toLowerCase();

    const conditionQuestionData = questionnaire.filter(q => q.id === conditionQuestion);
    // if conditionQuestion exists in datafile && user has already answered
    if (conditionQuestionData.length === 1 && userAnswers[conditionQuestion]) {
      const userAnswerId = userAnswers[conditionQuestion];

      const userAnswer = conditionQuestionData[0].antwoordOpties
        .filter(antwoord => antwoord.value === userAnswerId)
        .map(antwoord => antwoord.value);
      const userAnswerText = userAnswer.toString().toLowerCase();
      // if conditionAnswer is the same as answeredQuestion
      return conditionAnswerText === userAnswerText;
    }
    return false;
  });
