var assert = require('assert');
var should = require('should');
var request = require('supertest');
var util = require('util');
var async = require('async');

var redis=require('redis');
require("bluebird").promisifyAll(redis.RedisClient.prototype);
var redisclient = redis.createClient(require("../../config.js").redis.userdb);

var hostname=require("../../config.js").testhostname;


describe('标签创建', function() {
    var tagdata ={
      id:"",
      name:"美男子",
      desc:"非常美的男子",
      status:"1"
    }
    before(()=>{
    });

    it('创建成功', function(done) {
      request(hostname)
        .post('/api/tagmg/createtag')
        .send(tagdata)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          res.body.data.name.should.be.equal(tagdata.name);
          tagdata.id=res.body.data.id;
          done();
        });
    });

    it('更新成功', function(done) {
      tagdata.name ="丑男子";

      request(hostname)
        .post('/api/tagmg/createtag')
        .send(tagdata)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          res.body.data.name.should.be.equal(tagdata.name);
          done();
        });
    });
});

describe('分页查询', function() {
    var tagdata ={
      name:"",
      status:"",
      from: 1,
      size: 1
    };
    before(()=>{
    });

    it('分页查询1', function(done) {
      //tagdata.size = 2;
      request(hostname)
        .post('/api/tagmg/alltags')
        .send(tagdata)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          res.body.data.count.should.be.above(0);
          (res.body.data.result.length).should.be.equal(1);
          done();
        });
    });

    it('分页查询2', function(done) {
      tagdata.from = 2;
      request(hostname)
        .post('/api/tagmg/alltags')
        .send(tagdata)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.data.count.should.be.above(0);
          (res.body.data.result.length).should.be.equal(1);
          done();
        });
    });

    it('分页查询3', function(done) {
      tagdata.from = 1;
      tagdata.size = 2;
      request(hostname)
        .post('/api/tagmg/alltags')
        .send(tagdata)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          res.body.data.count.should.be.above(0);
          (res.body.data.result.length).should.be.equal(2);
          done();
        });
    });

    it('分页查询4', function(done) {
      tagdata.from = 1;
      tagdata.size = 2;
      tagdata.name = "丑";

      request(hostname)
        .post('/api/tagmg/alltags')
        .send(tagdata)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          res.body.data.count.should.be.above(0);
          (res.body.data.result.length).should.be.equal(2);
          done();
        });
    });

     it('分页查询4', function(done) {
      tagdata.from = 1;
      tagdata.size = 2;
      tagdata.name = "";
      tagdata.status = 1;

      request(hostname)
        .post('/api/tagmg/alltags')
        .send(tagdata)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          res.body.data.count.should.be.above(0);
          (res.body.data.result.length).should.be.equal(2);
          done();
        });
    });
});


describe('单个查询', function() {
    var tagdata ={
      id:"",
      name:"美男子",
      desc:"非常美的男子",
      status:"1"
    }
    before(()=>{
    });

    it('创建成功', function(done) {
      request(hostname)
        .post('/api/tagmg/createtag')
        .send(tagdata)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          res.body.data.name.should.be.equal(tagdata.name);
          tagdata.id=res.body.data.id;
          done();
        });
    });

    it('单个查询', function(done) {
      request(hostname)
        .get('/api/tagmg/tagbyid?id='+"00a5c955-8fb5-4b5e-8cf2-b23ce439395f")
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          done();
        });
    });
});