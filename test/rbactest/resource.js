var assert = require('assert');
var should = require('should');
var request = require('supertest');

var redis=require('redis');
require("bluebird").promisifyAll(redis.RedisClient.prototype);
var redisclient = redis.createClient(require("../../config.js").redis.userdb);

//   //resourcetype: Menu, Actions, Tab
//   //ParrentID
//status:1. Active, 2. InActive
var hostname="http://localhost:8080";

//1.创建一个资源，如创建一个菜单，以及菜单的级别；如果有父资源时，创建父子关联关系表 parentid:id；
describe('POST /api/rbacmg/resourceinit', function() {
  var noparent_resourceid,
      withparent_resourceid,
      parentresource = {
        id: ''
        ,name: "父节点"
        ,type: "menu"
        ,parentid: null
        ,status: 1
      },
      childresource = {
        id: ''
        ,name: "子节点"
        ,type: "action"
        ,parentid: noparent_resourceid
        ,status: 1
      };

  describe('创建资源成功', function() {
    it('创建一个资源，如创建一个菜单，没有父节点', function(done) {
      request(hostname)
        .post('/api/rbacmg/resourceinit')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          noparent_resourceid = res.body.data.id;
          done();
        });
    });

    it('创建一个资源，如创建一个菜单，有父节点', function(done) {
      request(hostname)
        .post('/api/rbacmg/resourceinit')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.body.errcode.should.be.equal(0);
          noparent_resourceid = res.body.data.id;
          done();
        });
    });
  });

  describe('资源创建成功结果比对', function() {
    var expect_parentresource,expect_childresource;

    before(function() {
      parentresource.id = noparent_resourceid;
      childresource.id = withparent_resourceid;

      redisclient.get(noparent_resourceid,(err, data) => {
        expect_parentresource = data;
      });

      redisclient.get(withparent_resourceid,(err, data) => {
        expect_childresource = data;
      });
    });

    after(function() { 

    });

    it('获取没有父资源菜单信息', function(done) {
       expect_parentresource.should.be.equal(parentresource);
    });

    it('获取有父资源菜单信息，以及父节点关联关系表parentid:id', function(done) {
       expect_childresource.should.be.equal(childresource);
    });
  })
});

//测试案例
//1.创建一个资源，如创建一个菜单，以及菜单的级别；如果有父资源时，创建父子关联关系表 parentid:id；
//2.展示所有资源列表；
//3.根据资源ID获取所有上下级依赖；包括权限依赖的Hash关系
//4.针对资源类型、名称进行搜索方法 ，Post测试；
//5.根据ID删除某个资源，并且，check所有的依赖并删除；限制，除非所有权限没有依赖此权限。

// describe('RBAC Instance', function() {
//   it('should be an instance', function() {
//     rbac.should.be.type('object');
//   });
// });

// describe('Resource', function() {
//   //resourcetype: Menu, Actions, Tab
//   //ParrentID
//   //status:1. Active, 2. InActive
//   var resource = {
//     id: 'tj'
//     ,name: "aa"
//     ,type: "Menu"
//     ,parentid:'aaaaa'
//     ,status: 1
//   };

//   describe('#createResource()', function() {
//     it('should save resource successful', function(done) {
//       rbac.resource.createResource(resource,function(err,data){
//        should.not.exist(err);
//        should.exist(data);
//        data.should.be.OK;

//        done();
//      });
//     });
//   });

//   describe('#fetchById()', function() {
//     it('should get resource successful', function(done) {
//       rbac.resource.fetchById(resource.id,function(err,data){
//        should.not.exist(err);
//        var d = JSON.parse(data);
//        d.should.be.type("object");
//        d.id.should.equal(resource.id);
//        d.resourcename.should.equal(resource.resourcename);

//        done();
//      });
//     });

//     it('should get resource failed', function(done) {
//       rbac.resource.fetchById("xxxxxxx",function(err,data){
//        should.not.exist(err);
//        should.not.exist(data);

//        done();
//      });
//     });
//   });


//   describe('#fetchByResourcename()', function() {
//     it('should get resource successful', function(done) {
//       rbac.resource.fetchByResourcename(resource.resourcename,function(err,data){
//         should.not.exist(err);
//         var d = JSON.parse(data);
//         d.should.be.type("object");
//         d.id.should.equal(resource.id);
//         d.resourcename.should.equal(resource.resourcename);
//         done();
//      });
//     });
//   });


//   describe('#deleteResource()', function() {
//     it('should delete resource successful', function(done) {
//       rbac.resource.deleteResource(resource.id,function(err,data){
//         should.not.exist(err);
//         data.should.be.OK;
        
//         done();
//      });
//     });
//   });
// });
