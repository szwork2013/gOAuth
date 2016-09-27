var assert = require('assert');
var should = require('should');
var request = require('supertest');

//测试案例
//1.创建用户基本信息
//2.根据用户ID获取用户信息；
//3.获取所有用户列表；
//4.删除某个用户；删除用户的权限关系；
//5.根据用户字段进行搜索
//6.根据用户ID获取用户密码，并配对；

// describe('RBAC Instance', function() {
//   it('should be an instance', function() {
//     rbac.should.be.type('object');
//   });
// });

// describe('User', function() {
//   var user = {
//     id: 'tj'
//     , username: "aa"
//   };

//   describe('#createUser()', function() {
//     it('should save user successful', function(done) {
//       rbac.user.createUser(user,function(err,data){
//        should.not.exist(err);
//        should.exist(data);
//        data.should.be.OK;

//        done();
//      });
//     });
//   });

//   describe('#fetchById()', function() {
//     it('should get user successful', function(done) {
//       rbac.user.fetchById(user.id,function(err,data){
//        should.not.exist(err);
//        var d = JSON.parse(data);
//        d.should.be.type("object");
//        d.id.should.equal(user.id);
//        d.username.should.equal(user.username);

//        done();
//      });
//     });

//     it('should get user failed', function(done) {
//       rbac.user.fetchById("xxxxxxx",function(err,data){
//        should.not.exist(err);
//        should.not.exist(data);

//        done();
//      });
//     });
//   });


//   describe('#fetchByUsername()', function() {
//     it('should get user successful', function(done) {
//       rbac.user.fetchByUsername(user.username,function(err,data){
//         should.not.exist(err);
//         var d = JSON.parse(data);
//         d.should.be.type("object");
//         d.id.should.equal(user.id);
//         d.username.should.equal(user.username);
//         done();
//      });
//     });
//   });


//   // describe('#deleteUser()', function() {
//   //   it('should delete user successful', function(done) {
//   //     rbac.user.deleteUser(user.id,function(err,data){
//   //       should.not.exist(err);
//   //       data.should.be.OK;
        
//   //       done();
//   //    });
//   //   });
//   // });
// });

