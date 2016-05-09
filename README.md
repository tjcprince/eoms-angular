# eoms-angular
eoms前端项目 gulp+bower+angular+bootstrap
开发工具 sublime text 3.0
执行 npm install && bower install

1.插件ui-navbar不能自动引入css问题
第一种方案
(1)需要修改 bower_components/ui-navbar/bower.json中的"main" 为
"main": ["release/js/ui-navbar.js","release/css/ui-navbar.scss"]
(2)修改bower_components/ui-navbar/release/css/ui-navbar.css为ui-navbar.scss
第二种方案
把bower_components/ui-navbar/release/css/中的ui-navbar.css放到src/app中 并且修改名字为ui-navbar.scss
暂时使用的是第二种方案
2.app/components/abntree树形菜单的相关文档
https://github.com/nickperkinslondon/angular-bootstrap-nav-tree
使用是一样的，已经稍微改造过
3.localstorage缓存 引用第三方的web-storage-cache，可设置超时时间哟
用法是https://github.com/WQTeam/web-storage-cache/blob/master/README_zh_CN.md
4.使用restangular进行访问服务器
5.bootstrap-additions 应用于AngularStrap 的aside功能
