var noOp = function() {
  return {
    then: noOp
  , catch: noOp
  }
};

module.exports = function() {
  this.database = {
    dbCreate: function() {
      return {
        run: noOp
      }
    }
  , dbList: noOp
  , tableCreate: noOp
  , indexCreate: noOp
  }
};
