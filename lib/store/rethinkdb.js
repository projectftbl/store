var rethinkdb = require('rethinkdbdash')
  , chalk = require('chalk')
  , configuration = require('../configuration')
  , log = require('@ftbl/log');

var Store = function() {
  if (this instanceof Store === false) return new Store();

  this.config = configuration();
  this.database = rethinkdb({ 
    servers: [ this.config ]
  , buffer: 2
  , max: 2
  , pingInterval: 10
  , timeout: 60
  , discovery: false 
  });

  this.database.getPoolMaster().on('log', log.info);

  log.info('Connected to RethinkDB at ' + chalk.green(this.config.host));
};

module.exports = Store;
