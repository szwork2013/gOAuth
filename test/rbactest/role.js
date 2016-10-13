var assert = require('assert');
var should = require('should');
var request = require('supertest');
var util = require('util');
var async = require('async');

var redis=require('redis');
require("bluebird").promisifyAll(redis.RedisClient.prototype);
var redisclient = redis.createClient(require("../../config.js").redis.userdb);

var hostname=require("../../config.js").testhostname;
var roles = require("../../data.js").roles;

//测试案例
//1.创建一个角色
//2.获取角色信息；
//3.分页获取角色列表；
//3.针对权限名称进行搜索; todo:没有完成
//5.根据ID删除某个权限； todo:没有完成
// var roles = [
//     {
//         id:'3b7c2d81-aa23-4025-85a7-44c28a472718',
//         name:'admin',
//         desc:'后台管理员权限',
//         isactive: '0'
//     },
//     {
//         id:'26fa0ec4-60ea-474f-a2cb-842a1319bd14',
//         name:'new',
//         desc:'新建用户',
//         isactive:'0'
//     },
//     {
//         id:'f70a2e61-b106-4678-98de-7c092c7a8852',
//         name:'verified',
//         desc:'认证用户',
//         isactive: '0'
//     }
// ];

describe('角色创建', function() {
    before(()=>{
       var keys=['role:'+roles[0].id,'role:'+roles[1].id];
       redisclient.send_command("DEL",keys);
    });

    it('创建成功1', function(done) {
      request(hostname)
        .post('/api/rbacmg/createrole')
        .send(roles[0])
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
        .post('/api/rbacmg/createrole')
        .send(roles[1])
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
        .post('/api/rbacmg/createrole')
        .send(roles[1].ID)
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

describe('获取角色', function() {
    it('获取单个角色信息', function(done) {
      request(hostname)
        .get('/api/rbacmg/rolebyid?id='+roles[0].id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          res.body.data.id.should.be.equal(roles[0].id);
          res.body.data.name.should.be.equal(roles[0].name);
          res.body.data.desc.should.be.equal(roles[0].desc);
          res.body.data.isactive.should.be.equal(roles[0].isactive);
            
          done();
        });
    });
  });

describe('分页获取角色', function() {
    it('获取成功', function(done) {
      request(hostname)
        .get(util.format('/api/rbacmg/allroles?from=%s&size=%s','1','10'))
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);

         async.each(roles,(item)=>{
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
        .get(util.format('/api/rbacmg/allroles?from=%s&size=%s','',''))
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
