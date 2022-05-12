const _ = require('lodash');
const db = require('../../db/index.js');
const CreateUserSchema = require('./userSchema.js');

const parseData = options => {
  // console.log('options', options)
  return _.reduce(options, (parsed, value, key) => {
    parsed.string.push(`${key} = ?`);
    parsed.values.push(value);
    return parsed;
  }, { string: [], values: [] });
};

class Model {
  constructor(tablename) {
    this.tablename = tablename;
  }

  get(options) {
    let userInput = parseData(options).values[0];
      return CreateUserSchema.find({ 'username': userInput });
  }
}

module.exports = Model;