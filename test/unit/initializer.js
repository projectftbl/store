var define = sinon.stub().resolves()
  , setupDatabase = sinon.stub().resolves();

var setupRequires = function() {
  var requires = {
    './setupDatabase': setupDatabase
  };

  requires[process.cwd() + '/test/fixtures/users/repositories/user.js'] = { define: define };

  return requires;
};

describe('initializer', function() {
  var sut = proxyquire('../../lib/initializer', setupRequires());

  before(function() {
    sut(__dirname + '/../fixtures', [ 'users' ]);
  });

  it('should setup database', function() {
    setupDatabase.should.be.called;
  });

  it('should call define on user repo', function() {
    define.should.be.called;
  });

});