var inherits = require('util').inherits
  , Promise = require('bluebird')
  , Base = require('../../../../lib/repository');

var Repository = function() {
  if (this instanceof Repository === false) return new Repository;

  Base.call(this, 'user', require('../schemas/user'));
};

inherits(Repository, Base);

Repository.prototype.sanitize = function(data) {
  if (data.dob) data.dob = new Date(data.dob).toISOString();
  return data;
};

Repository.prototype.clean = function(data) {
  delete data.password;
  return data;
};

module.exports = new Repository;
