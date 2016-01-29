[feather](http://feather-ui.github.io)
====================

an industrialized framework for frontend baesd on fis

feather是基于fis开发的一套前端定制版工业化框架，专注于前端开发过程中碰到的规范、框架、辅助工具、本地调试、性能、多人合作开发等问题，简单、快速，跨平台(支持linux，mac，windows) **学习成本几乎为: 0**

###实现功能：

* 完美继承fis所有功能，包括3种语言能力扩展，csssprite，合并文件，压缩等。
* 支持对html的压缩。
* 自定义script以及link标签出现的位置，以及当前标签是否仅预览模式产出，默认script会放置页面底部，而css放置页面底部。
* 内置内联script以及link内容压缩插件
* 内置less-css预编译插件。
* 内置feather.js，前端模块化加载工具，支持声明deps进行模块并行预加载，提升资源加载性能、并支持css加载，兼非常轻量。同时内置插件自动分析js依赖，无需手动声明deps。
* 内置js模块自动包裹插件，象写nodejs语言一样写js代码，代码可直接运行在node上。
* 内置PHP模版引擎，结合fis提供的fis-server，实现动态模版渲染本地调试支持，并支持模版嵌套，也可采用项目原有模版引擎，只需轻松实现2个接口以及支持插件机制即可。
* livereload功能扩展。
* 页面分割组件开发，实现组件静态资源自动加载机制，大型团队多人协同开发利器，大幅度提升团队战斗力。CTO再也不用担心项目架构和开发效率了。
* 支持使用pagelet页面开发，自动包裹pagelet内容以及管理页面静态资源
* 支持动态本地调试，url模拟，随机数据生成等。
* 支持跨模块编译，大型项目模块独立开发上线利器。
* 优秀的静态资源管理方案，粒度细至单文件上线。
* 支持内联静态资源编译模式，适用webapp或者非模版引擎渲染的纯静态页面项目，且该模式支持自动打包页面零散资源的功能。
* 一条配置，完美实现component解析规则以及feather.js的模块加载规则。
* fis自带的md5文件名版本号外，同时支持启用querystring形式的文件md5版本号模式。
* 新增项目脚手架命令-init，一键创建项目
* 其他：自动删除css中同域资源domain，动态domain支持，静态资源baseurl设置等等。

**注：feather对static目录下，任意third目录不做任何处理。**

**更多文档详见[feather](http://feather-team.github.io)**

**[更新日志](./CHANGELOG.md)**
