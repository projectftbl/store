var Promise = require('bluebird')
  , fs = require('fs')
  , path = require('path')
  , setupDatabase = require('./setupDatabase');

module.exports = function(lib, folders) {
  var definitions = folders.map(function(folder) {

    var directory = path.join(lib,  folder, 'repositories');

    if (fs.existsSync(directory) === false) return Promise.cast();

    var files = fs.readdirSync(directory);

    return files.map(function(file) {
      var Repository = require(path.join(directory, file));
      
      return Repository.define();
    });
  });

  return Promise.all([ setupDatabase() ].concat(definitions));
};