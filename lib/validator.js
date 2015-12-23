var _ = require('lodash')
  , validator = require('is-my-json-valid');

var Validator = function(schema) {
  schema = _.assign(schema || {}, { additionalProperties: false })

  this.filter = validator.filter(schema);
  this.validate = validator(schema);
};

Validator.prototype.filter = function(data) {
  return this.filter(data);
};

Validator.prototype.validate = function(data) {
  return this.validate(data);
};

module.exports = Validator;
