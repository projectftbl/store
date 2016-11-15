var configuration = require('@recipher/configuration');

module.exports = require('./' + (configuration('store') || 'rethinkdb'));