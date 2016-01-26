var sut = require('../../lib/configuration');

describe('configuration', function() {
    
  describe('from host, port, database', function() {
    before(function() {
      this.configuration = sut({ host: 'localhost', port: 29015, database: 'test' });
    });
    
    it('should set correct host', function() {
      this.configuration.host.should.equal('localhost');
    });
      
    it('should set correct port', function() {
      this.configuration.port.should.equal(29015);
    });
      
    it('should set correct database', function() {
      this.configuration.db.should.equal('test');
    });
  });
    
  describe('from url', function() {
    before(function() {
      this.configuration = sut({ url: 'rethinkdb://@127.0.0.1:28015', database: 'test' });
    });
    
    it('should set correct host', function() {
      this.configuration.host.should.equal('127.0.0.1');
    });
      
    it('should set correct port', function() {
      this.configuration.port.should.equal(28015);
    });
     
    it('should set correct database', function() {
      this.configuration.db.should.equal('test');
    });
  });
    
  describe('from defaults', function() {
    before(function() {
      this.configuration = sut({ host: null, port: null, database: null });
    });
    
    it('should set default host', function() {
      this.configuration.host.should.equal('localhost');
    });
      
    it('should set default port', function() {
      this.configuration.port.should.equal(28015);
    });
     
    it('should not set database', function() {
      should.not.exist(this.configuration.password);
    });
  });

});