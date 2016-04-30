var sut = require('../../lib/paging');

describe('paging', function() {
  it('should return defaults', function() {
    sut().should.deep.equal({ skip: 0, limit: 25 });
  });

  it('should allow overriding limit', function() {
    sut(null, 100).should.deep.equal({ skip: 0, limit: 100 });
  });

  it('should allow specifying a different page', function() {
    sut(2).should.deep.equal({ skip: 25, limit: 25 });
  });

  it('should allow specifying a different page and limit', function() {
    sut(3, 50).should.deep.equal({ skip: 100, limit: 50 });
  });

  it('should allow specifying skip directly', function() {
    sut(3, 50, 50).should.deep.equal({ skip: 50, limit: 50 });
  });
});