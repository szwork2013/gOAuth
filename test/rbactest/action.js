var assert = require('assert');
var should = require('should');

var rbac = require("../../lib/rbacprovider")("redis");

describe('RBAC Instance', function() {
  it('should be an instance', function() {
    rbac.should.be.type('object');
  });
});

describe('Action', function() {
  var action = {
    id: 'tj'
    , actionname: "aa"
  };

  describe('#createAction()', function() {
    it('should save action successful', function(done) {
      rbac.action.createAction(action,function(err,data){
       should.not.exist(err);
       should.exist(data);
       data.should.be.OK;

       done();
     });
    });
  });

  describe('#fetchById()', function() {
    it('should get action successful', function(done) {
      rbac.action.fetchById(action.id,function(err,data){
       should.not.exist(err);
       var d = JSON.parse(data);
       d.should.be.type("object");
       d.id.should.equal(action.id);
       d.actionname.should.equal(action.actionname);

       done();
     });
    });

    it('should get action failed', function(done) {
      rbac.action.fetchById("xxxxxxx",function(err,data){
       should.not.exist(err);
       should.not.exist(data);

       done();
     });
    });
  });


  describe('#fetchByActionname()', function() {
    it('should get action successful', function(done) {
      rbac.action.fetchByActionname(action.actionname,function(err,data){
        should.not.exist(err);
        var d = JSON.parse(data);
        d.should.be.type("object");
        d.id.should.equal(action.id);
        d.actionname.should.equal(action.actionname);
        done();
     });
    });
  });


  describe('#deleteAction()', function() {
    it('should delete action successful', function(done) {
      rbac.action.deleteAction(action.id,function(err,data){
        should.not.exist(err);
        data.should.be.OK;
        
        done();
     });
    });
  });
});
