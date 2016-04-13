var Store = require('./store')
  , log = require('@ftbl/log')
  , configuration = require('@ftbl/configuration');

module.exports = function() {
  var store = new Store
    , database = configuration('rethinkdb:database');

  return store.database.dbList().then(function(databases) {
    log.info('Existing databases: ' + (databases || []).join(', '));
    if ((databases || []).indexOf(database) >= 0) return;
    return store.database.dbCreate(database).run();
  }, function(error) { /* No op */ });
};