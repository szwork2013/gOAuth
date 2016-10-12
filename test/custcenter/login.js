var assert = require('assert');
var should = require('should');
var request = require('supertest');

var redis=require('redis');
require("bluebird").promisifyAll(redis.RedisClient.prototype);
var redisclient = redis.createClient(require("../../config.js").redis.userdb);

var hostname=require("../../config.js").testhostname;
var users = require("../../data.js").users;

//
describe('POST /api/custcenter/login', function() {
  var user = users[0];

  describe('用户登陆', function() {
    it('用户成功登陆', function(done) {
      request(hostname)
        .post('/api/custcenter/login',user)
        .send({username:"userName",password:"1111"})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          done();
        });
    });

    it('用户登陆失败-账户为空', function(done) {
      request(hostname)
        .post('/api/custcenter/login',user)
        .send({username:"",password:"1111"})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(30001);
          done();
        });
    });

    it('用户登陆失败-密码为空', function(done) {
      request(hostname)
        .post('/api/custcenter/login',user)
        .send({username:"userName",password:""})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(30001);
          done();
        });
    });

    it('用户登陆失败-密码不正确', function(done) {
      request(hostname)
        .post('/api/custcenter/login',user)
        .send({username:"userName",password:"121212"})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(30003);
          done();
        });
    });

    it('用户登陆失败-用户找不到', function(done) {
      request(hostname)
        .post('/api/custcenter/login',user)
        .send({username:"aaaaa",password:"121212"})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(30002);
          done();
        });
    });

    it('用户登陆失败-验证码不正确', function(done) {
      request(hostname)
        .post('/api/custcenter/login',user)
        .send({username:"userName",password:"1111",code:"1111"})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(30005);
          done();
        });
    });

    it('用户登陆失败-必须验证码', function(done) {
      request(hostname)
        .post('/api/custcenter/login',user)
        .send({username:"userName",password:"1111",code:""})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(30005);
          done();
        });
    });
  });
});