var assert = require('assert');
var should = require('should');

var rbac = require("../../lib/rbacprovider")("redis");

describe('RBAC Instance', function() {
  it('should be an instance', function() {
    rbac.should.be.type('object');
  });
});

describe('User', function() {
  var user = {
    id: 'tj'
    , name: "dddd "
  };

  describe('#createUser()', function() {
    it('should save user successful', function(done) {
      rbac.user.createUser(user,function(err,data){
       should.not.exist(err);
       should.exist(data);
       data.should.be.OK;

       done();
     });
    });
  });

  describe('#fetchById()', function() {
    it('should get user successful', function(done) {
      rbac.user.fetchById(user.id,function(err,data){
       should.not.exist(err);
       var d=JSON.parse(data);
       d.should.be.type("object");
       d.id.should.equal(user.id);
       d.name.should.equal(user.name);

       done();
     });
    });

    it('should get user failed', function(done) {
      rbac.user.fetchById("xxxxxxx",function(err,data){
       should.not.exist(err);
       should.not.exist(data);

       done();
     });
    });
  });
});