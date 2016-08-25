feather2.0
==========================
feather2.0是继[feather](http://github.com/feather-team/feather)之后基于fis3.0进行扩展的工程化框架。

2.0的架构做出了很大的调整，并目标于feather1.x不同，2.0仅仅只适用于纯静态页面的前端项目，比如webapp，或结合一些mvvm框架进行开发的项目。

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
