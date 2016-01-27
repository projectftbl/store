var configuration = require('@ftbl/configuration');

module.exports = require('./' + (configuration('store') || 'rethinkdb'));