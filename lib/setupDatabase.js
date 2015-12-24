var Store = require('./store')
  , configuration = require('@ftbl/configuration');

module.exports = function() {
  var store = new Store
    , database = configuration('rethinkdb:database');

  return store.database.dbCreate(database).run();
};