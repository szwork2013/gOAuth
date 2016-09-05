# gOAuth

[![Build Status](https://travis-ci.org/golden-tech-native/gOAuth.svg?branch=master)](https://travis-ci.org/golden-tech-native/gOAuth) </br>

gOAuth用于提供接口OAuth授权以及用户权限管理的内部项目组件。当前仍在开发和完善中，陆续还会加入websocket实时响应的相关支持。

* [版本以及依赖安装](https://github.com/golden-tech-native/gOAuth#版本以及依赖安装)
* [运行](https://github.com/golden-tech-native/gOAuth#运行)
* [开发说明](https://github.com/golden-tech-native/gOAuth#开发说明)
* [文件夹目录说明](https://github.com/golden-tech-native/gOAuth#文件夹目录说明)
  * [controller文件夹](https://github.com/golden-tech-native/gOAuth#controller文件夹)
  * [lib文件夹](https://github.com/golden-tech-native/gOAuth#lib文件夹)
  * [public文件夹](https://github.com/golden-tech-native/gOAuth#public文件夹)
  * [views文件夹](https://github.com/golden-tech-native/gOAuth#views文件夹)
  * [配置文件集](https://github.com/golden-tech-native/gOAuth#配置文件集)
    * [app.js文件](https://github.com/golden-tech-native/gOAuth#app.js文件)
    * [config.js文件](https://github.com/golden-tech-native/gOAuth#config.js文件)
    * [package.json文件](https://github.com/golden-tech-native/gOAuth#package.json文件)
    * [process.json文件](https://github.com/golden-tech-native/gOAuth#process.json文件)
    * [require.js文件](https://github.com/golden-tech-native/gOAuth#require.js文件)
* [ToDo List](https://github.com/golden-tech-native/gOAuth#ToDoList)

# 版本以及依赖安装
Node版本: v6.5.0 </br>
Npm版本: 3.10.3 </br>

可使用NVM进行Node.js版本管理，请参考[NVM管理Node](https://github.com/golden-tech-native/dtlib/wiki/4.1-Node.js%E7%89%88%E6%9C%AC%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7NVM%E5%AE%89%E8%A3%85) </br>

进入文件根目录，并运行下面命令</br>
```
$ npm install
```
安装完毕以后，会出现`node_modules`文件夹</br>

拷贝根目录中的文件`index.js_nm`到文件夹`node_modules`中，并修改`index.js_nm`为`index.js`</br>

# 运行
有两种方法运行程序: node 和 [PM2](https://github.com/golden-tech-native/dtlib/wiki/4.2-Node.js%E9%83%A8%E7%BD%B2%E5%B7%A5%E5%85%B7PM2%E5%AE%89%E8%A3%85)

> node
```
$ node app.js -harmony
```
> PM2 （推荐使用）
```
$ pm2 start process.json
```

# 开发说明
# 文件夹目录说明
## controller文件夹
## public文件夹
## views文件夹
## 配置文件集
### app.js文件
### config.js文件
### package.js文件
### process.json文件
### require.js文件
# ToDoList
* oauthserver中，用户以及权限定义的重构以适应普片项目情况。（由于是在accesstoken重新生成以后需要失效原accesstoken的功能尚未实现）</br>
* oauthserver中加入客户端session的控制部分</br>
* redis组件构建缓存机制</br>
* redis组件构建缓存机制</br>
* websocket链接mqserver的扩充，当前只是提供统一http接口来触发服务器变化。</br>
* unit test案例的补充</br>
* exsample的补充</br>
