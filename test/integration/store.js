var Store = require('../../lib/store');

describe('Store', function() {
  var suite = this;
  
  before(function() {
    suite.sut = new Store;
    suite.database = suite.sut.database;
  });

  it('should create a database connection', function(done) {
    suite.database.expr(0).run().then(function() {
      done();
    }, done);
  });

  it('should expose config', function() {
    suite.sut.config.host.should.exist;
    suite.sut.config.port.should.exist;
    suite.sut.config.db.should.exist;
  });
});