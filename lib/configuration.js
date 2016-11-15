var _ = require('lodash')
  , configuration = require('@recipher/configuration');

module.exports = function(config) {
  if (config == null) {
    config = _.assign({}, {
      url: configuration('rethinkdb:port:28015:tcp') || configuration('rethinkdb:url')
    , port: configuration('rethinkdb:port')
    , host: configuration('rethinkdb:host')
    , database: configuration('rethinkdb:database')
    , authKey: configuration('rethinkdb:authkey')
    });
  }

  if (config.url) {
    var url = require('url').parse(config.url);

    config = {
      port: parseInt(url.port, 10)
    , host: url.hostname
    , db: config.database
    };

    if (url.auth) config.authKey = url.auth.split(':')[1];
  } else {
    config = {
      port: config.port || 28015
    , host: config.host || 'localhost'
    , db: config.database
    , authKey: config.authKey
    };
  }

  if (configuration('rethinkdb:cert')) {
    config.ssl = { ca: configuration('rethinkdb:cert') }
  }

  return config;
};