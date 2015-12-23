var Promise = require('bluebird')
  , fs = require('fs')
  , path = require('path');

module.exports = function(lib, folders) {
  return Promise.all(folders.map(function(folder) {

    var directory = path.join(lib,  folder, 'repositories');

    if (fs.existsSync(directory) === false) return Promise.cast();

    var files = fs.readdirSync(directory);

    return files.map(function(file) {
      var Repository = require(path.join(directory, file));

      if (!Repository.define) return Promise.cast();
      
      return Repository.define();
    });
  }));
};