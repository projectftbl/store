var database = 'test'
    dbList = sinon.stub().resolves()
  , dbCreate = sinon.stub().resolves()
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

});