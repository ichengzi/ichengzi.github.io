## 使用nginx部署 reactapp

如果我们在使用react-router的时候选择了**浏览器历史管理方式**，那么服务器必须要能够正确处理各种路径。实际上我们的应用只有一个页面文件，在访问各种有效路径的时候，服务都应该返回那唯一的页面。

在开发过程中，我们通过npm start指令启动了一个node服务，它已经处理好了这些路由。但是在实际生产环境中，我们往往会使用一个静态服务器，比如nginx或apache。如果把刚才打包好的dist目录扔给nginx，你会发现只有根路径可以访问，通过点击跳转到各个路由没问题（也就是通过react-router控制的跳转），要直接在浏览器的地址栏输入"yourSiteName.com/news"这样的自路径就404了。

现在以nginx为例来配置好适合我们应用的路由。
我们所需配置的内容都在http > server节点下。
首先考虑对诸如/news这样的路径并不存在对应的页面文件，所以对于未知路径要都给打发到根路径下：

``` config
location / { 
      root /Users/someone/my-project/dist; 
      index index.html index.htm; 
      try_files $uri /index.html;
}
```

这样，我们在地址栏输入"yourSiteName.com/news"以后，nginx没有找到news.html，它就尝试找index.html，inedex.html打开后，我们的代码就生效了，react-router看到地址栏里的路径是/news，它就会在一开始去匹配/news，并改变状态。

作者：胖芮
链接：https://www.jianshu.com/p/8d76debc0f49
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。