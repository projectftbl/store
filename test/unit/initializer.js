var define = sinon.stub().resolves();

var setupRequires = function() {
  var requires = {};

  requires[__dirname + '/../fixtures/users/repositories/user'] = { define: define };

  return requires;
};

describe('initializer', function() {
  var sut = sandbox.require('../../lib/initializer', {
    requires: setupRequires()
  });

  before(function() {
    sut(__dirname + '/../fixtures', [ 'users' ]);
  });

  it('should call define on user repo', function() {
    define.should.be.called;
  });

});