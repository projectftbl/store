var _ = require('lodash')
  , configuration = require('@ftbl/configuration');

module.exports = function(config) {
  if (config == null) {
    config = _.assign({}, {
      url: configuration('rethinkdb:port:28015:tcp') || configuration('rethinkdb:url')
    , port: configuration('rethinkdb:port')
    , host: configuration('rethinkdb:host')
    , database: configuration('rethinkdb:database')
    });
  }

  if (config.url) {
    var url = require('url').parse(config.url);

    config = {
      port: parseInt(url.port, 10)
    , host: url.hostname
    , db: config.database
    };
  } else {
    config = {
      port: config.port || 28015
    , host: config.host || 'localhost'
    , db: config.database
    };
  }

  if (configuration('rethinkdb:cert')) {
    config.ssl = { ca: configuration('rethinkdb:cert') }
  }

  return config;
};