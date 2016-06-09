var database = 'test'
  , catc = sinon.stub()
  , run = sinon.stub().returns({ catch: catc })
  , dbList = sinon.stub().resolves()
  , dbCreate = sinon.stub().returns({ run: run })
  , Store = function() {
      this.database = {
        dbList: dbList
      , dbCreate: dbCreate
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

  it('should list the databases', function() {
    dbList.should.be.called;
  });

  it('should create the correct database', function() {
    dbCreate.should.be.calledWith(database);
  });

  it('should run the query', function() {
    run.should.be.called;
  });

});