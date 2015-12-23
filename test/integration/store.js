var Store = require('../../lib/store');

describe.only('Store', function() {
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

  it('should expose config', function(done) {
    suite.sut.config.host.should.equal('localhost');
    suite.sut.config.port.should.equal(28015);
    suite.sut.config.database.should.equal('test');
  });
});