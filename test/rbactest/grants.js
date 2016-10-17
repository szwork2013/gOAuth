var assert = require('assert');
var should = require('should');
var request = require('supertest');
var util = require('util');
var async = require('async');

var redis=require('redis');
require("bluebird").promisifyAll(redis.RedisClient.prototype);
var redisclient = redis.createClient(require("../../config.js").redis.userdb);

var hostname=require("../../config.js").testhostname;
var user_resources = require("../../data.js").user_resources;
var user_roles = require("../../data.js").user_roles;
var role_resources = require("../../data.js").role_resources;


//测试案例
//1.创建权限与资源的对应Hash, action:roleid
//2.获取某权限下所有资源（递归获取）;
//3.根据资源ID获取所有的权限依赖；
//4.删除某个权限与子券的关系；
//5.权限有效期？？？与产品交易有关
//6.创建用户和权限的关系；并创建用户与资源的关系，同时，应用7和2来创建交集；
//7.根据用户获取所有权限；
//8.根据权限获取所有用户；
//9.根据用户ID获取所有资源
//10.根据用户ID获取所有权限、资源

describe('角色资源创建', function() {
    before(()=>{
       
    });

    it('创建失败-无参数', function(done) {
      request(hostname)
        .post('/api/rbacmg/createroleresources')
        .send("")
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(40001);
          done();
        });
    });

    it('创建失败-参数roleid为空', function(done) {
      request(hostname)
        .post('/api/rbacmg/createroleresources')
        .send({id:''})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(40001);
          done();
        });
    });

    it('创建失败-参数Resources为空', function(done) {
      request(hostname)
        .post('/api/rbacmg/createroleresources')
        .send({id:'aaa'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(40001);
          done();
        });
    });

    it('创建失败-roleid不存在', function(done) {
      request(hostname)
        .post('/api/rbacmg/createroleresources')
        .send({id:'aaa',resources:["aaaaa"]})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(40001);
          done();
        });
    });

    it('创建成功', function(done) {
      request(hostname)
        .post('/api/rbacmg/createroleresources')
        .send(role_resources[0])
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



describe('用户角色创建', function() {
    before(()=>{
       
    });

    it('创建失败-无参数', function(done) {
      request(hostname)
        .post('/api/rbacmg/createuserroles')
        .send("")
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(40001);
          done();
        });
    });

    it('创建失败-参数userid为空', function(done) {
      request(hostname)
        .post('/api/rbacmg/createuserroles')
        .send({id:''})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(40001);
          done();
        });
    });

    it('创建失败-参数roles为空', function(done) {
      request(hostname)
        .post('/api/rbacmg/createuserroles')
        .send({id:'aaa'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(40001);
          done();
        });
    });

    it('创建失败-userid不存在', function(done) {
      request(hostname)
        .post('/api/rbacmg/createuserroles')
        .send({id:'aaa',roles:["aaaaa"]})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(40001);
          done();
        });
    });

    it('创建成功', function(done) {
      request(hostname)
        .post('/api/rbacmg/createuserroles')
        .send(user_roles[0])
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
        .post('/api/rbacmg/createuserroles')
        .send(user_roles[1])
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

describe('获取完整用户角色权限', function() {
    before(()=>{
       
    });

    it('获取完整用户角色权限', function(done) {
      request(hostname)
        .get('/api/rbacmg/usergrants?id='+user_roles[0].id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          console.log(res.body.data);

          //检测用户角色
          async.each(user_roles,(item)=>{
            if(item.id==res.body.data.id)
            {
              res.body.data.roles.should.containDeep(item.roles);
            }
          });

          //todo 检测用户权限

          done();
        });
    });
});

describe('后台登入', function() {
    it('后台登入', function(done) {
      request(hostname)
        .post('/api/rbacmg/userlogin')
        .send({username:"admin",password:"123456"})
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

