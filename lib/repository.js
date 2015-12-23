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

Repository.prototype.paging = paging;

Repository.prototype.get = function(id) {
  var clean = clean.bind(this);

  return this.table.get(id).run().then(clean, function(err) {
    return; // Swallow and return nothing
  });
};

Repository.prototype.find = function(query, options) {
  var c = clean.bind(this)
    , opts = _.defaults(options || {}, { page: 1, size: PAGE_SIZE })
    , page = this.paging(opts.page, opts.limit)
    , sort = opts.sort ? { orderBy: [ options.sort, options.dir || 'ASC' ] } : {};

  return this.Entity.findAll(_.assign({}, query, page, sort)).then(function(entities) {
    return entities.map(c);
  });
};

Repository.prototype.list = function(options) {
  return this.find({}, options);
};

var validate = function(validator, data) {
  if (validator && validator.validate(data) === false) throw new errors.ValidationError();
};

var filter = function(validator, data) {
  return validator.filter(data);
};

var clean = function(data) {
  return _(this.clean).isFunction() ? this.clean(data) : data;
};

var prepare = function(data) {
  if (data.id) delete data.id;

  if (_(this.sanitize).isFunction()) data = this.sanitize(data);

  return this.validator.validate(this.validator.filter(data));
};

Repository.prototype.create = function(data) {
  var prepare = prepare.bind(this)
    , clean = clean.bind(this);
  return this.Entity.create(prepare(data)).then(clean);
};

Repository.prototype.update = function(id, data) {
  var prepare = prepare.bind(this)
    , clean = clean.bind(this);

  return this.get(id).then(function(entity) {
    if (entity == null) return;
    delete entity.id;
    return this.Entity.update(id, prepare(_.assign(entity, data))).then(clean);
  }.bind(this));
};

Repository.prototype.truncate = function(query) {
  return this.Entity.destroyAll(query);
};

Repository.prototype.delete = function(id) {
  return this.Entity.destroy(id);
};

module.exports = Repository;