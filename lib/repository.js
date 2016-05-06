var _ = require('lodash')
  , Promise = require('bluebird')
  , errors = require('@ftbl/errors')
  , Store = require('./store')
  , paging = require('./paging')
  , Validator = require('./validator');

var Repository = function(model, schema, options) {
  if (this instanceof Repository === false) return new Repository(model, schema, options);
  
  this.store = new Store;
  this.database = this.store.database;
  this.model = model;
  this.table = this.database.table(this.model);
  this.options = _.assign({}, { define: true }, options);
  
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
  var opts = _.assign({}, { dir: 'asc' }, options)
    , c = opts.noClean ? function(d) { return d; } : clean.bind(this)
    , page = this.paging(opts.page, opts.limit)
    , sort = opts.sort || 'id'
    , orderBy = opts.dir.toLowerCase() === 'asc' 
      ? this.database.asc(sort) 
      : this.database.desc(sort);

  return this.table
  .orderBy({ index: orderBy })
  .filter(query || {})
  .skip(page.skip)
  .limit(page.limit)
  .then(function(data) {
    return data.map(c);
  });
};

Repository.prototype.count = function(query) {
  return this.table.filter(query || {}).count()
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
      if (result.changes.length === 0 || result.changes[0].new_val == null) return c(entity);
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

Repository.prototype.createIndex = function(index) {
  return this.table.indexCreate(index).catch(function(err) {
    // Swallow
  });
};

Repository.prototype.createIndexes = function() {
  var indexes = Array.prototype.slice.call(arguments);
  return Promise.map(indexes, this.createIndex.bind(this));
};

var createTable = Promise.method(function() {
  if (this.options.define === false) return;
  return this.database.tableCreate(this.model);
});

Repository.prototype.define = function() {
  var index = function() {
    if (_(this.index).isFunction()) return this.index();
  }.bind(this);

  return createTable.call(this).then(index, index);
};

module.exports = Repository;