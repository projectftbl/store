var _ = require('lodash')
  , User = require('../fixtures/users/repositories/user');

var USER = { 
  name: 'John Doe'
, email: 'john@doe.com'
, password: 'password'
, dummy: 'invalid' 
, dob: '12/31/1990'
};

describe('Repository', function() {
  var suite = this;

  before(function(done) {
    User.define().then(function() {
      User.truncate().then(function() {
        done();
      });
    });     
  });
    
  describe('create', function() {
      
    before(function(done) {
      User.create(USER).then(function(user) {
        suite.user = user;
      }).then(done);      
    });
    
    it('should create a user', function() {
      suite.user.should.exist;
    });
    
    it('should generate an id', function() {
      suite.user.id.should.exist;
    });
    
    it('should set correct email', function() {
      suite.user.email.should.equal('john@doe.com');
    });
    
    it('should set correct name', function() {
      suite.user.name.should.equal('John Doe');
    });
    
    it('should set correct dob', function() {
      suite.user.dob.should.equal('1990-12-31T00:00:00.000Z');
    });
    
    it('should filter invalid properties', function() {
      should.not.exist(suite.user.dummy);
    });
    
    it('should remove password', function() {
      should.not.exist(suite.user.password);
    });

    describe('find', function() {
      before(function(done) {
        User.find().then(function(users) {
          suite.users = users;
        }).then(done);
      });   
        
      it('should list a single user', function() {
        suite.users.should.have.length(1);
      });     
        
      it('should return the same user', function() {
        suite.users[0].should.deep.equal(suite.user);
      });     
    });

    describe('get', function() {
      before(function(done) {
        User.get(suite.user.id).then(function(user) {
          suite.newUser = user;
        }).then(done);
      });   
        
      it('should return the same user', function() {
        suite.newUser.should.deep.equal(suite.user);
      });

      it('should return null for unknown user', function(done) {
        User.get(123).then(function(user) {
          should.not.exist(user);
          done();
        });
      });  
    });

    describe('update', function() {
      var update = { name: 'Jane Doe' };
      before(function(done) {
        User.update(suite.user.id, update).then(function(user) {
          suite.updatedUser = user;
          done();
        });
      });   
        
      it('should return the updated user', function() {
        suite.updatedUser.should.deep.equal(_.assign({}, suite.user, update));
      });     
    });

    describe('delete the user', function(done) {
      before(function(done) {
        User.delete(suite.user.id).then(function(deleted) {
          suite.deleted = deleted;
          done();
        });
      });   
        
      it('should return correct delete count', function() {
        suite.deleted.should.equal(1);
      });     
        
      it('should have deleted the user', function(done) {
        User.get(suite.user.id).then(function(user) {
          should.not.exist(user);
          done();
        });
      });     
    });
  });
});