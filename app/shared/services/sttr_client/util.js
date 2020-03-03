const isNumber = require('lodash.isnumber');
const isBoolean = require('lodash.isboolean');
const isString = require('lodash.isstring');

// Simple checks
const isSimpleType = val => isBoolean(val) || isString(val) || isNumber(val);

// Array checks
const collectionOfSimpleTypes = col => Array.isArray(col) && !col.find(val => !isSimpleType(val));
const collectionOfType = (col, type) => {
  if (!Array.isArray(col) || col.includes(undefined) || col.includes(null)) {
    return false;
  }
  return col.find(val => val.constructor.name !== type) === undefined;
};

// Filters
const uniqueFilter = (value, index, self) => self.indexOf(value) === index;

module.exports = {
  uniqueFilter,
  isSimpleType,
  collectionOfSimpleTypes,
  collectionOfType,
};
