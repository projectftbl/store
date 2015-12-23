// var should = require('chai').should()
//   , User = require('../fixtures/users/repositories/user');

// var USER = { 
//   name: 'John Doe'
// , email: 'john@doe.com'
// , password: 'password'
// , dummy: 'invalid' 
// , dob: '12/31/1990'
// };

// describe('Repository', function() {
  
//   var suite = this;
  
//   before(function(done) {
//     User.truncate().then(function() {
//       done();
//     });
//   });
  
//   describe('#create', function() {
    
//     before(function(done) {
//       User.create(USER).then(function(user) {
//         suite.user = user;
//       }).then(done);      
//     });
    
//     it('should create a user', function() {
//       suite.user.should.exist;
//     });
    
//     it('should generate an id', function() {
//       suite.user.id.should.exist;
//     });
    
//     it('should set correct email', function() {
//       suite.user.email.should.equal('john@doe.com');
//     });
    
//     it('should set correct name', function() {
//       suite.user.name.should.equal('John Doe');
//     });
    
//     it('should set correct dob', function() {
//       suite.user.dob.should.equal('1990-12-31T00:00:00.000Z');
//     });
    
//     it('should filter invalid properties', function() {
//       should.not.exist(suite.user.dummy);
//     });
    
//     it('should remove password', function() {
//       should.not.exist(suite.user.password);
//     });

//     describe('#list', function() {
//       before(function(done) {
//         User.list().then(function(users) {
//           suite.users = users;
//         }).then(done);
//       });   
        
//       it('should list a single user', function() {
//         suite.users.should.have.length(1);
//       });     
        
//       it('should return the same user', function() {
//         suite.users[0].should.eql(suite.user);
//       });     
//     });
    
//   });
 
// });