var _ = require('lodash')
  , validator = require('is-my-json-valid');

var Validator = function(schema) {
  this.schema = _.assign({}, schema, { additionalProperties: false })

  this.filter = validator.filter(this.schema);
  this.validate = validator(this.schema);
};

module.exports = Validator;
