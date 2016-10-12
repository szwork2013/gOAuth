var assert = require('assert');
var should = require('should');
var request = require('supertest');
var util = require('util');
var async = require('async');

var redis=require('redis');
require("bluebird").promisifyAll(redis.RedisClient.prototype);
var redisclient = redis.createClient(require("../../config.js").redis.session);

var hostname=require("../../config.js").testhostname;
var resources = require("../../data.js").resources;

//   //resourcetype: Menu, Actions, Tab
//   //ParrentID
//status:1. Active, 2. InActive


describe('资源创建', function() {
    before(()=>{
       var keys=['resource:'+resources[0].id,'resource:'+resources[1].id];
       redisclient.send_command("DEL",keys);
    });

    it('创建成功1', function(done) {
      request(hostname)
        .post('/api/rbacmg/createresource')
        .send(resources[0])
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          done();
        });
    });

    it('创建成功2', function(done) {
      request(hostname)
        .post('/api/rbacmg/createresource')
        .send(resources[1])
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          done();
        });
    });

    it('创建失败-少参数', function(done) {
      request(hostname)
        .post('/api/rbacmg/createresource')
        .send(resources[1].ID)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(40001);
          done();
        });
    });
  });

describe('获取资源', function() {
    it('获取单个资源信息', function(done) {
      request(hostname)
        .get('/api/rbacmg/resourcebyid?id='+resources[0].id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);

          res.body.data.id.should.be.equal(resources[0].id);
          res.body.data.name.should.be.equal(resources[0].name);
          res.body.data.desc.should.be.equal(resources[0].desc);
          res.body.data.isactive.should.be.equal(resources[0].isactive);
          done();
        });
    });
  });

describe('分页获取资源', function() {
    it('获取成功', function(done) {
      request(hostname)
        .get(util.format('/api/rbacmg/allresources?from=%s&size=%s','0','10'))
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);

          async.each(resources,(item)=>{
            if(item.id==res.body.data.id)
            {
              res.body.data.name.should.be.equal(item.name);
              res.body.data.desc.should.be.equal(item.desc);
              res.body.data.isactive.should.be.equal(item.isactive);
            }
          });
          done();
      });
    });

    it('获取失败', function(done) {
      request(hostname)
        .get(util.format('/api/rbacmg/allresources?from=%s&size=%s','',''))
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(40001);
          done();
          });
    });
});
