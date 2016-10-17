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
var user1 = {
    id:"",
    name:"18915433333",
    password:"123456",
    status:0,
    type:2,
    mobile:"",
    email:""
};

var user2 = {
    id:"",
    name:"r@163.com",
    password:"546789",
    status:1,
    type: 1,
    mobile:"",
    email:""
};


//测试案例
//1.创建用户基本信息
//2.根据用户ID获取用户信息；
//3.获取所有用户列表；
//4.删除某个用户；删除用户的权限关系；
//5.根据用户字段进行搜索
//6.根据用户ID获取用户密码，并配对；

describe('用户创建', function() {
    var id;
    before(()=>{
       // var keys=['user:'+users[0].id,'user:'+users[1].id];
       // redisclient.send_command("DEL",keys);
    });

    it('创建成功1', function(done) {
      request(hostname)
        .post('/api/rbacmg/createuser')
        .send(user1)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          id = res.body.data.id;
          done();
        });
    });

    it('创建成功2', function(done) {
      request(hostname)
        .post('/api/rbacmg/createuser')
        .send(user2)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          done();
        });
    });

    it('创建-失败', function(done) {
      request(hostname)
        .post('/api/rbacmg/createuser')
        .send(user1)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(30002);
          done();
        });
    });

    it('更新成功', function(done) {
      user1.id = id;
      user1.status =2;
      user1.type =2;
      user1.mobile ="1234567889";
      user1.email ="xxxx@xxx.com";

      request(hostname)
        .post('/api/rbacmg/createuser')
        .send(user1)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
        });
       done();
    });
  });

describe('获取用户', function() {
    it('获取单个用户信息', function(done) {
      request(hostname)
        .get('/api/rbacmg/userbyid?id='+user1.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          console.log(res.body);
          done();
        });
    });
  });

describe('分页获取用户', function() {
    it('获取成功', function(done) {
      request(hostname)
        .post('/api/rbacmg/allusers')
        .send({mobile:"189",from:1,size:10})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          console.log(res.body.data);
          done();
        });
    });
});

