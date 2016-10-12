var assert = require('assert');
var should = require('should');
var request = require('supertest');

var redis=require('redis');
require("bluebird").promisifyAll(redis.RedisClient.prototype);
var redisclient = redis.createClient(require("../../config.js").redis.userdb);

var hostname=require("../../config.js").testhostname;

describe('验证码接口测试', function() {
    it('正常', function(done) {
      request(hostname)
        .get('/api/custcenter/codegenerate')
        //.send({username:"13888888888",mobile:"13888888888",password:"1111"})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          //res.body.data.code.length.should.be.equal(4);
          console.log(res.body.data);
          done();
        });
    });
});