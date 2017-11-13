## 项目目录结构

```
.
├── bower_components             // bower包
│   ├── jquery                
│   ├── uikit                   
│   └── ...
├── package.json
├── README.md
├── gulpfile.js                  // gulp 配置文件
├── dist                         // dist目录：dev下临时打包目录
├── docs                         // docs目录：github page
└── src                          // 源文件目录
    ├── assets                   // 静态资源目录 
    │   ├── font                 // 字体
    │   ├── img                  // 图片
    │   ├── json                 // .json
    │   └── md                   // .md
    ├── components               // 公共组件
    │   ├── header.html          // header组件
    │   ├── footer.html          // footer组件
    │   └── ...
    ├── css                      // css目录 
    │   ├── common               // 通用样式
    │   │   ├── _header.scss     // header组件样式
    │   │   ├── _footer.scss     // footer组件样式
    │   │   └── ...     
    │   ├── pages                // 页面级样式
    │   │   ├── news.scss        // news页面样式
    │   │   ├── cities.scss      // cities页面样式
    │   │   └── ...    
    │   ├── cities.scss          // sass打包后的页面级样式文件
    │   └── main.scss            // sass打包后的主要样式文件
    ├── js                       // js 目录 
    │   ├── index.js             // 通用js文件
    │   ├── news.js              // news页面js文件
    │   └── ...                  
    └── pages                    // pages目录 gulp直接copy到dist目录下=>网站路由结构
        ├── about                // /about
        │   ├── index.html             
        ├── news                 // /news
        │   ├── index.html             
        │   ├── 52.html          // /news/52.html=>id=52的新闻页面
        ├── ...             
        └── index.html            

```
