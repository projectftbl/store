var Store = require('./store')
  , configuration = require('@ftbl/configuration');

module.exports = function() {
  var store = new Store
    , database = configuration('rethinkdb:database');

  return store.database.dbList().then(function(databases) {
    if ((databases || []).indexOf(database) >= 0) return;
    return store.database.dbCreate(database).run();
  });
};