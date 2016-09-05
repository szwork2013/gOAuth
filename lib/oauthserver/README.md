由于整个项目通过require.js中的定义自动引用和export方法，然而，本文件中有不是发布function的export存在，因此，把文件“oauth20.js”移至plug文件夹。
oauth20.js文件本身属于此文件夹。 </br>

修改部分：</br>
对oauth20.js中的 ｀var model = require('./model/' + type).oauth2｀进行了修改 </br>