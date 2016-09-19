var assert = require('assert');
var should = require('should');

var rbac = require("../../lib/rbacprovider")("redis");

describe('RBAC Instance', function() {
  it('should be an instance', function() {
    rbac.should.be.type('object');
  });
});

describe('Resource', function() {
  var resource = {
    id: 'tj'
    , resourcename: "aa"
  };

  describe('#createResource()', function() {
    it('should save resource successful', function(done) {
      rbac.resource.createResource(resource,function(err,data){
       should.not.exist(err);
       should.exist(data);
       data.should.be.OK;

       done();
     });
    });
  });

  describe('#fetchById()', function() {
    it('should get resource successful', function(done) {
      rbac.resource.fetchById(resource.id,function(err,data){
       should.not.exist(err);
       var d = JSON.parse(data);
       d.should.be.type("object");
       d.id.should.equal(resource.id);
       d.resourcename.should.equal(resource.resourcename);

       done();
     });
    });

    it('should get resource failed', function(done) {
      rbac.resource.fetchById("xxxxxxx",function(err,data){
       should.not.exist(err);
       should.not.exist(data);

       done();
     });
    });
  });


  describe('#fetchByResourcename()', function() {
    it('should get resource successful', function(done) {
      rbac.resource.fetchByResourcename(resource.resourcename,function(err,data){
        should.not.exist(err);
        var d = JSON.parse(data);
        d.should.be.type("object");
        d.id.should.equal(resource.id);
        d.resourcename.should.equal(resource.resourcename);
        done();
     });
    });
  });


  describe('#deleteResource()', function() {
    it('should delete resource successful', function(done) {
      rbac.resource.deleteResource(resource.id,function(err,data){
        should.not.exist(err);
        data.should.be.OK;
        
        done();
     });
    });
  });
});
