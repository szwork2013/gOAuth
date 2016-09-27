var assert = require('assert');
var should = require('should');
var request = require('supertest');

//测试案例
//1.创建一个权限
//2.展示所有权限列表；
//3.针对权限名称进行搜索；
//5.根据ID删除某个权限；



// describe('RBAC Instance', function() {
//   it('should be an instance', function() {
//     rbac.should.be.type('object');
//   });
// });

// describe('Role', function() {
//   var role = {
//     id: 'tj'
//     , rolename: "aa"
//   };

//   describe('#createRole()', function() {
//     it('should save role successful', function(done) {
//       rbac.role.createRole(role,function(err,data){
//        should.not.exist(err);
//        should.exist(data);
//        data.should.be.OK;

//        done();
//      });
//     });
//   });

//   describe('#fetchById()', function() {
//     it('should get role successful', function(done) {
//       rbac.role.fetchById(role.id,function(err,data){
//        should.not.exist(err);
//        var d = JSON.parse(data);
//        d.should.be.type("object");
//        d.id.should.equal(role.id);
//        d.rolename.should.equal(role.rolename);

//        done();
//      });
//     });

//     it('should get role failed', function(done) {
//       rbac.role.fetchById("xxxxxxx",function(err,data){
//        should.not.exist(err);
//        should.not.exist(data);

//        done();
//      });
//     });
//   });


//   describe('#fetchByRolename()', function() {
//     it('should get role successful', function(done) {
//       rbac.role.fetchByRolename(role.rolename,function(err,data){
//         should.not.exist(err);
//         var d = JSON.parse(data);
//         d.should.be.type("object");
//         d.id.should.equal(role.id);
//         d.rolename.should.equal(role.rolename);
//         done();
//      });
//     });
//   });


//   describe('#deleteRole()', function() {
//     it('should delete role successful', function(done) {
//       rbac.role.deleteRole(role.id,function(err,data){
//         should.not.exist(err);
//         data.should.be.OK;
        
//         done();
//      });
//     });
//   });
// });






