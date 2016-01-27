var noOp = function() {
  // no op        
};

module.exports = function() {
  this.database = {
    dbList: {
      then: noOp
    }

  , dbCreate: {
      then: noOp
    }
    
  , tableCreate: {
      then: noOp
    }
   
  , indexCreate: {
      then: noOp
    }
  }
};
