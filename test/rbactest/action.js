var assert = require('assert');
var should = require('should');
var request = require('supertest');


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


// describe('RBAC Instance', function() {
//   it('should be an instance', function() {
//     rbac.should.be.type('object');
//   });
// });

// describe('Action', function() {
//   var action = {
//     id: 'tj'
//     , actionname: "aa"
//   };

//   describe('#createAction()', function() {
//     it('should save action successful', function(done) {
//       rbac.action.createAction(action,function(err,data){
//        should.not.exist(err);
//        should.exist(data);
//        data.should.be.OK;

//        done();
//      });
//     });
//   });

//   describe('#fetchById()', function() {
//     it('should get action successful', function(done) {
//       rbac.action.fetchById(action.id,function(err,data){
//        should.not.exist(err);
//        var d = JSON.parse(data);
//        d.should.be.type("object");
//        d.id.should.equal(action.id);
//        d.actionname.should.equal(action.actionname);

//        done();
//      });
//     });

//     it('should get action failed', function(done) {
//       rbac.action.fetchById("xxxxxxx",function(err,data){
//        should.not.exist(err);
//        should.not.exist(data);

//        done();
//      });
//     });
//   });


//   describe('#fetchByActionname()', function() {
//     it('should get action successful', function(done) {
//       rbac.action.fetchByActionname(action.actionname,function(err,data){
//         should.not.exist(err);
//         var d = JSON.parse(data);
//         d.should.be.type("object");
//         d.id.should.equal(action.id);
//         d.actionname.should.equal(action.actionname);
//         done();
//      });
//     });
//   });


//   describe('#deleteAction()', function() {
//     it('should delete action successful', function(done) {
//       rbac.action.deleteAction(action.id,function(err,data){
//         should.not.exist(err);
//         data.should.be.OK;
        
//         done();
//      });
//     });
//   });
// });
