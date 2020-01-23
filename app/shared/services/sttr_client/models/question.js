const isString = require('lodash.isstring');
const { isSimpleType, collectionOfType } = require('../util');

const DESC_MAX_LENGTH = 2048;

/**
 * A Question ...
 *
 */
class Question {
  /**
   * @param {string} id - unique identifier
   * @param {string} type - data type of the question, eg. 'boolean', 'list', or 'geo'
   * @param {string} text - the question itself
   * @param {string} [description] - a description for this question (mind the max-length)
   * @param {(boolean|string|number|string[])} [answer] the values inputs should have
   */
  constructor(id, type, text, description, answer) {
    if (!isString(id)) {
      throw Error(`'id' for Question must be a string`);
    }
    if (['boolean', 'string', 'number', 'list', 'geo'].indexOf(type) === -1) {
      throw Error(`Unsupported type for Question (${type})`);
    }
    if (text !== undefined && !isString(text)) {
      throw Error(`'text' for Question must be a string (got "${text}"`);
    }
    if (description !== undefined && (!isString(description) || [...description].length > DESC_MAX_LENGTH)) {
      throw Error(`'description' must be a string with max. ${DESC_MAX_LENGTH} chars`);
    }

    this._id = id;
    this._type = type;
    this._text = text;
    this._description = description;
    if (answer !== undefined) {
      this.setAnswer(answer);
    }
  }

  static isAnswerType(val) {
    return isSimpleType(val) || (Array.isArray(val) && collectionOfType(val, 'String'));
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
    if (!Question.isAnswerType(value)) {
      throw Error(`value for 'setAnswer' must be a string, bool or number or string[]`);
    }

    /* eslint-disable valid-typeof */
    if (this._type === 'geo' || this._type === 'list') {
      throw Error(`'geo' and 'list' types are not yet supported.`);
    } else if (typeof value !== this._type) {
      throw Error(`value '${value}' not valid for Answer of type ${this._type}`);
    }
    /* eslint-enable valid-typeof */

    this._answer = value;
  }

  get answer() {
    return this._answer;
  }
}

module.exports = Question;
