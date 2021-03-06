const isString = require('lodash.isstring');
const { collectionOfType } = require('../util');

/**
 * Step checker class for quiz
 *
 * @typedef {import('./decision')} Decision
 * @typedef {import('./question')} Question
 *
 * @property {Question[]} _questions - an internally used list of questions
 * @property {Decision[]} _decision - an internally used list of decisions
 */
class Permit {
  /**
   * Constructor for Checker
   *
   * @param {string} name - A namve for this checker;
   * @param {Decision[]} decisions - Decisions for this quiz
   */
  constructor(name, decisions) {
    if (!isString(name)) {
      throw Error("'name' must be a String");
    }
    if (!Array.isArray(decisions) || !collectionOfType(decisions, 'Decision')) {
      throw Error("'decisions' must be an array of type 'Decision'");
    }
    this.name = name;
    this._questions = decisions.flatMap(decision => decision.getQuestions());
    this._decisions = decisions;
  }

  getDecisionById(id) {
    return this._decisions.find(d => d.id === id);
  }

  get questions() {
    return this._questions;
  }

  /**
   * Find output of matching rule for decision with a specific id
   *
   * @param {string} id - The decision id.
   * @returns {(string|undefined)[]} the resulting output
   */
  getOutputByDecisionId(id) {
    const decision = this.getDecisionById(id);
    if (!decision) {
      throw Error(`'getOutputByDecisionId' failed to find id '${id}'`);
    }
    return decision.getOutput();
  }

  // // XXX remove this?
  // /**
  //  * Find output of matching rule for the decision
  //  *
  //  * @returns {(string|undefined)[]} the resulting output
  //  */
  // getOutput() {
  //   if (this._decisions.length !== 1) {
  //     throw Error('getOutput failed. More then one decision found.');
  //   }
  //   return this._decisions[0].getOutput();
  // }
}

module.exports = Permit;
