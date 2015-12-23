var Promise = require('bluebird');

var generateHandle = Promise.method(function(handle, Repository, index) {
  if (handle == null) return handle;

  if (index == null) index = 0;

  var test = handle + (index === 0 ? '' : index);
  
  return Repository.find({ handle: test }).then(function(entities) {
    if (entities.length === 0) return test;
    return generateHandle(handle, Repository, ++index);
  });
});

module.exports = {
  generateHandle: generateHandle
};