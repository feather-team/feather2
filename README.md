feather2.0
==========================
feather2.0是继[feather](http://github.com/feather-team/feather)之后基于fis3.0进行扩展的工程化框架。

2.0的架构做出了很大的调整，提高用户的易用性，并于feather1.x不同，2.0仅仅只适用于纯静态页面的前端项目，比如webapp，或结合一些mvvm框架进行开发的项目。

基于2.0可以非常容易的再次扩展出动态语言的工程化框架，并且开发量也较少，如: [lothar](http://github.com/feather-team/lothar)(blade模板引擎)

####2.0与1.x部分功能比较：

| 功能                  | 1.x               | 2.0   |
|-----------------------|------------------:|------:|
|fis基础功能   | 支持             |支持     |
|本地调试   | 支持             |支持     |
|本地服务器   | java             |node     |
|文件优化压缩预编译   | 支持             |支持     |
|项目脚手架   | 支持             |支持     |
|livereload   | 支持             |支持     |
|模块化   | 支持             |支持     |
|模板继承   | 不支持             |支持     |
|bigrender/pipe/quickly   | 部分支持             |支持     |
|包管理   | 不支持             |支持     |
|多人协同   | 支持             |支持     |
|多模块开发   |动态支持             |动态支持     |
|静态资源自动combo方式合并   | 不支持            |支持     |
|自动优化静态资源位置   | 支持             |支持     |
|远程deploy方式   | http             |http/ftp     |

## 使用文档

### gogogo

安装
```sh
npm install -g feather2
```

使用脚手架创建项目
```sh
feather2 init demo
```

编译项目
```sh
feather2 release -r demo
```

开启本地server，预览项目
```sh
feather2 server start
```
### 组件包
feather2.0中直接对bower install进行了支持，因为bower的资源是非常丰富的，甚至可以支持github上的某一个仓库的分支。

但是bower包几乎都采用了amd或umd规范，甚至有些bower包的是没有规范的，而feather因为静态资源管理的问题，采用了commonjs规范，因此feather对其进行了一定的处理，尽可能的让bower中的包能够正常的运行。同时删除了bower包中无用的文件。

另外，在项目中支持直接在页面中引用某一个组件包，而不需要知道具体引用的包文件，就像npm结合node中的require一样，大大提高开发者的便捷

安装包
```sh
cd demo
feather2 install socket.io-client bootstrap vue #包会被直接安装至components目录下
```

使用包(index.html)
```html 
<link href="bootstrap/css/bootstrap.css" type="text/css" />

<script>
require.async('vue', function(Vue){
    console.log(Vue);
});

require.async('socket.io-client', function(io){
    console.log(io);
});
</script>
```

#### 2.0文件查找规则
首先会对所有components目录中包当中的**.json文件进行分析，提取main属性，并缓存。
当使用某一个文件时，无论是否是全路径还是段路径，都会直接先查找components中的包，如果找到正确的文件，则引用，否则会直接按照全路径做对应的处理
