const Checker = require('./models/checker');
const Permit = require('./models/permit');
const Decision = require('./models/decision');
const Question = require('./models/question');
const Rule = require('./models/rule');

/**
 * Build Question array from json config
 *
 * @param {*} questionConfig - The questions from json config
 * @returns {Question[]} an array with Question objects
 */
function getQuestions(questionConfig) {
  return Object.entries(questionConfig).map(([hash, { text, ids, type, description }]) => ({
    ids,
    question: new Question(hash, type, text, description),
  }));
}

/**
 * Build Decision array from json config. Decisions have a reference
 * to the Question object so that is required input too.
 *
 * @param {string} id - Unique identifier for the decision
 * @param {*} decisionConfig - The decisions from json config
 * @param {Question[]} questions - List of all the questions
 * @returns {Decision[]} an array with Decision objects
 */
function getDecision(id, decisionConfig, questions) {
  const { requiredInputs, requiredDecisions, decisionTable } = decisionConfig;
  if (!requiredInputs && !requiredDecisions) {
    throw Error("Either 'requiredInputs' or 'requiredDecisions' are needed");
  }

  const inputs =
    (requiredInputs &&
      requiredInputs.map(href => {
        const res = questions.find(q => q.ids.includes(href.replace('#input__', 'uitv__')));
        return res.question;
      })) ||
    requiredDecisions;

  return new Decision(
    id,
    inputs,
    decisionTable.rules.map(({ inputs: ruleInputs, output, description }) => new Rule(ruleInputs, output, description)),
  );
}

/**
 * Create a Checker object
 *
 * @param {any} config - the config coming from json
 * @returns {Checker} the new Checker object
 */
function getChecker(config) {
  const { permits: permitsConfig } = config;
  const x = permitsConfig.reduce((acc, curr) => {
    Object.entries(curr.questions).forEach(([hash, question]) => {
      const { id, ...rest } = question;
      if (acc[hash]) {
        acc[hash].ids.push(id);
      } else {
        acc[hash] = { ...rest, ids: [id] };
      }
    });
    return acc;
  }, {});
  const allQuestions = getQuestions(x);

  const permits = permitsConfig.map(permit => {
    const { questions, decisions, name } = permit;

    const decisionConfigs = Object.entries(decisions);
    if (decisions.length === 0) {
      throw Error("'decisions' should not be empty.");
    }
    if (questions.length === 0) {
      throw Error("'questions' should not be empty.");
    }

    const simpleDecisions = decisionConfigs
      .filter(([_, json]) => !json.requiredDecisions) // filter out complex-decisions
      .map(([id, json]) => getDecision(id, json, allQuestions));

    const complexDecisions = decisionConfigs
      .filter(([_, json]) => !!json.requiredDecisions) // only get complex ones
      .map(([id, json]) => {
        const requiredDecisions = json.requiredDecisions.map(href =>
          simpleDecisions.find(sd => sd.id === href.substring(1)),
        );
        const decisionConfig = { ...json, requiredDecisions };
        return getDecision(id, decisionConfig, allQuestions);
      });

    const result = new Permit(name, [...simpleDecisions, ...complexDecisions]);
    return result;
  });

  const checker = new Checker(permits);

  return checker;
}

module.exports = getChecker;
