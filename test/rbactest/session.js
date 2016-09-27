var assert = require('assert');
var should = require('should');
var request = require('supertest');

//1.session创建使用User中的6，然后，成功则使用action中的10，并保存session；
//2.根据sessionID获取 session值；
//3.根据cookieID获取 session值；
//4.权限检测，没有权限时，抛出没有权限错误或者session过期错误；