var assert = require('assert');
var should = require('should');
var request = require('supertest');
var util = require('util');
var async = require('async');

var redis=require('redis');
require("bluebird").promisifyAll(redis.RedisClient.prototype);
var redisclient = redis.createClient(require("../../config.js").redis.userdb);

var hostname = require("../../config.js").testhostname;
var users = require("../../data.js").users;

//测试案例
//1.创建用户基本信息
//2.根据用户ID获取用户信息；
//3.获取所有用户列表；
//4.删除某个用户；删除用户的权限关系；
//5.根据用户字段进行搜索
//6.根据用户ID获取用户密码，并配对；

describe('用户创建', function() {
    before(()=>{
       var keys=['user:'+users[0].id,'user:'+users[1].id];
       redisclient.send_command("DEL",keys);
    });

    it('创建成功1', function(done) {
      request(hostname)
        .post('/api/rbacmg/createuser')
        .send(users[0])
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
        .post('/api/rbacmg/createuser')
        .send(users[1])
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
        .post('/api/rbacmg/createuser')
        .send(users[1].ID)
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

describe('获取用户', function() {
    it('获取单个用户信息', function(done) {
      request(hostname)
        .get('/api/rbacmg/userbyid?id='+users[0].id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          res.body.data.id.should.be.equal(users[0].id);
          res.body.data.name.should.be.equal(users[0].name);
          res.body.data.desc.should.be.equal(users[0].desc);
          res.body.data.status.should.be.equal(users[0].status);

          done();
        });
    });
  });

describe('分页获取用户', function() {
    it('获取成功', function(done) {
      request(hostname)
        .get(util.format('/api/rbacmg/allusers?from=%s&size=%s','0','10'))
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          //res.body.data.length.should.be.equal(users.length);

          async.each(users,(item)=>{
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
        .get(util.format('/api/rbacmg/allusers?from=%s&size=%s','',''))
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

