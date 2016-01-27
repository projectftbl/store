var Promise = require('bluebird')
  , sinon = require('sinon');

require('sinon-as-promised')(Promise);

var stub = sinon.stub().resolves();

module.exports = function() {
  this.database = {
    dbCreate: function() {
      return {
        run: stub
      }
    }
  , dbList: stub
  , tableCreate: stub
  , indexCreate: stub
  }
};
