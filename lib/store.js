var rethinkdb = require('rethinkdbdash')
  , url = require('url')
  , chalk = require('chalk')
  , configuration = require('./configuration')
  , log = require('@ftbl/log');

var Store = function() {
  if (this instanceof Store === false) return new Store();

  this.config = configuration();
  this.database = rethinkdb({ servers: [ this.config ] });

  log.info('Connected to RethinkDB at ' + chalk.green(this.config.host));
};

module.exports = Store;
