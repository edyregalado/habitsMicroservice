var request = require('supertest');
var server = require('../app');

describe('Server', function () {
  describe('api/users endpoint get', function () {
    it('returns a user array', function (done) {
      request(server)
        .get('/api/users')
        .expect(200)
        .end(function(err, res, body) {
        
          if (err) throw err;
          done();
        });
    });
  });
  
  describe('api/users endpoint post', function (){
  	it('return an json representation of an user', function(done){
      
  		request(server)
  		.post('/api/users')
        .set('Content-Type', 'application/x-www-form-urlencoded')
  		  .send('name=Enrique')
        .send('email=encisoenrique@gmail.com')
        .send('birthday=1994-02-11')
  		  
        .expect(200)
        .expect(hasIdKey)

        .expect(function(res) {
          res.body.message = 'user saved';
        
      })
  		 .end(function(err, res, body) {
        	
          if (err) throw err;
          done();
        });

        function hasIdKey(res) {
        if (!('userId' in res.body)) throw new Error("missing userId key");
        if ((res.body.userId.length != 24)) throw new Error("wrong length of id");
      }
  	});
  });

  describe('api/users endpoint delete', function  () {
    it('return a message of success when user exists', function  (done) {
      
      request(server)
      .delete('/api/users')
      .set('Content-Type', 'application/x-www-form-urlencoded')
        .send('email=encisoenrique@gmail.com')
        .expect(200)
        .expect(function(res) {
          res.body.message = 'User successfully deleted';
        
      })
       .end(function(err, res, body) {
          
          if (err) throw err;
          done();
        });
    });

      it('return a message of success when user exists', function  (done) {
      
      request(server)
      .delete('/api/users')
      .set('Content-Type', 'application/x-www-form-urlencoded')
        .send('email=encisoenrique@gmail.com')
        .expect(404)
        .expect(function(res) {
          res.body.message = 'User successfully deleted';
        
      })
       .end(function(err, res, body) {
          
          if (err) throw err;
          done();
        });
    });

  });
});