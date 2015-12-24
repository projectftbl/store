var database = 'test'
  , run = sinon.stub()
  , dbCreate = sinon.stub().returns({ run: run })
  , Store = function() {
      this.database = {
        dbCreate: dbCreate
      };
    };

var sut = proxyquire('../../lib/setupDatabase', {
  './store': Store
, '@ftbl/configuration': sinon.stub().withArgs('rethinkdb:database').returns(database)
});

describe('setupDatabase', function() {

  beforeEach(function() {
    sut();
  });

  it('should create the correct database', function() {
    dbCreate.should.be.calledWith(database);
  });

  it('should run the query', function() {
    run.should.be.called;
  });

});