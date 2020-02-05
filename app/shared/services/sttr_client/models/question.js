const isString = require('lodash.isstring');
const { collectionOfType } = require('../util');

const DESC_MAX_LENGTH = 2048;

/**
 * A Question ...
 *
 */
class Question {
  /**
   * @param {string} id - unique identifier
   * @param {string} type - data type of the question, eg. 'boolean', or 'geo'
   * @param {string} text - the question itself
   * @param {string} [description] - a description for this question (mind the max-length)
   * @param {(boolean|string|number|string[])} [answer] the values inputs should have
   * @param {string[]} [options] a list of options for the answer
   * @param {boolean} [multipleAnswers=false] indicates if answer should be a list
   */
  constructor(id, type, text, description, answer, options, multipleAnswers = false) {
    if (!isString(id)) {
      throw Error(`'id' for Question must be a string`);
    }
    if (['boolean', 'string', 'number', 'geo'].indexOf(type) === -1) {
      throw Error(`Unsupported type for Question (${type})`);
    }
    if (text !== undefined && !isString(text)) {
      throw Error(`'text' for Question must be a string (got "${text}"`);
    }
    if (description !== undefined && (!isString(description) || [...description].length > DESC_MAX_LENGTH)) {
      throw Error(`'description' must be a string with max. ${DESC_MAX_LENGTH} chars`);
    }
    if (options !== undefined && !collectionOfType(options, 'String')) {
      throw Error(`Options must be array of String's`);
    }

    this._id = id;
    this._type = type;
    this._text = text;
    this._multipleAnswers = multipleAnswers;
    this._options = options;
    this._description = description;
    if (answer !== undefined) {
      this.setAnswer(answer);
    }
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  get text() {
    return this._text;
  }

  get description() {
    return this._description;
  }

  setAnswer(value) {
    // temporary fix to make current checkers work:
    // if (this._type === 'boolean') {
    //   value = value === 'yes';
    // }
    // if (this._multipleAnswers) {
    //   value = [value];
    // }

    /* eslint-disable valid-typeof */
    // if (this._type === 'geo') {
    //   // throw Error(`'geo' is not yet supported.`);
    // } else if (this._multipleAnswers) {
    //   // for now we only support string in answer[]
    //   if (!collectionOfType(value, 'String')) {
    //     throw Error(`value for 'setAnswer' must be of type ${this._type}[], got '${value}'`);
    //   }
    // } else if (typeof value !== this._type) {
    //   throw Error(`value for setAnswer must be of type ${this._type}, got '${value}'`);
    // }
    /* eslint-enable valid-typeof */

    this._answer = value;
  }

  get answer() {
    return this._answer;
  }
}

module.exports = Question;
