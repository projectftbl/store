var _ = require('lodash')
  , Promise = require('bluebird')
  , errors = require('@ftbl/errors')
  , Store = require('./store')
  , paging = require('./paging')
  , Validator = require('./validator');

var Repository = function(model, schema) {
  if (this instanceof Repository === false) return new Repository(model, schema);
  
  this.store = new Store;
  this.database = this.store.database;
  this.model = model;
  this.table = this.database.table(this.model);
  
  this.validator = new Validator(schema);
};

var clean = function(data) {
  return data && _(this.clean).isFunction() ? this.clean(data) : data;
};

var prepare = function(data) {
  if (_(this.sanitize).isFunction()) data = this.sanitize(data);

  data = this.validator.filter(data);

  if (this.validator.validate(data) === false) throw new errors.ValidationError();

  return data;
};

Repository.prototype.paging = paging;

Repository.prototype.get = function(id) {
  var c = clean.bind(this);

  return this.table.get(id).then(c);
};

Repository.prototype.find = function(query, options) {
  var c = clean.bind(this)
    , opts = options || {}
    , page = this.paging(opts.page, opts.limit)
    , sort = opts.sort || 'id';

  var orderBy = opts.dir !== 'DESC' ? sort :  this.database.desc(sort);

  return this.table.filter(query || {})
  .skip(page.skip)
  .limit(page.limit)
  // .orderBy({ index: orderBy })
  .then(function(entities) {
    return entities.map(c);
  });
};

Repository.prototype.create = function(data) {
  var p = prepare.bind(this)
    , c = clean.bind(this);

  return this.table.insert(p(data), { returnChanges: true })
  .then(function(result) {
    return c(result.changes[0].new_val);
  }.bind(this));
};

Repository.prototype.update = function(id, data) {
  var p = prepare.bind(this)
    , c = clean.bind(this);

  return this.table.get(id).then(function(entity) {
    return this.table.get(id).update(p(_.assign({}, entity, data)), { returnChanges: true })
    .then(function(result) {
      return c(result.changes[0].new_val);
    });
  }.bind(this));
};

Repository.prototype.truncate = function(query) {
  return this.table.filter(query || {}).delete().then(function(result) {
    return result.deleted;
  });
};

Repository.prototype.delete = function(id) {
  return this.table.get(id).delete().then(function(result) {
    return result.deleted;
  });
};

Repository.prototype.define = function() {
  var index = function(result) {
    if (_(this.index).isFunction()) return this.index();
  }.bind(this);

  return this.database.tableCreate(this.model).then(index, index);
};

module.exports = Repository;