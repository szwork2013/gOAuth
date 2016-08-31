# gOAuth
OAuth2.0 and RDBC for GD

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

# 版本以及依赖安装
Node版本: v6.5.0 </br>
Npm版本: 3.10.3 </br>

可使用NVM进行Node.js版本管理，请参考[NVM管理Node](https://github.com/golden-tech-native/dtlib/wiki/4.1-Node.js%E7%89%88%E6%9C%AC%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7NVM%E5%AE%89%E8%A3%85) </br>

进入文件根目录，并运行下面命令</br>
```
$ npm install
```
安装完毕以后，会出现`node_modules`文件夹

# 运行
有两种方法运行程序: node 和 [PM2](https://github.com/golden-tech-native/dtlib/wiki/4.2-Node.js%E9%83%A8%E7%BD%B2%E5%B7%A5%E5%85%B7PM2%E5%AE%89%E8%A3%85)

> node
```
$ node app.js -harmony
```
> PM2
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
