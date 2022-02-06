## Web Server & Application Server

Tomcat是应该列入应用服务器之流，尽管web服务器与应用服务器的区别其实并没有非常的大，通过一些服务，各自都能实现对方的功能，但还是有区别。

作者：luo
链接：https://www.zhihu.com/question/20096067/answer/226652400
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

Most of the times these terms Web Server and Application server are used interchangeably.在大多数时候，Web服务器和引用服务器这两个术语是可以互换使用的。

Following are some of the key differences in features of Web Server and Application Server:以下是Web服务器和应用服务器在特性上的一些关键的差异：

> Web Server is designed to serve HTTP Content. App Server can also serve HTTP Content but is not limited to just HTTP. It can be provided other protocol support such as RMI/RPC. Web服务器的设计目的是提供HTTP内容，应用服务器也可以提供HTTP内容，但不限于HTTP，它还可以提供其他协议支持，如RMI / RPC。

> Web Server is mostly designed to serve static content, though most Web Servers have plugins to support scripting languages like Perl, PHP, ASP, JSP etc. through which these servers can generate dynamic HTTP content. Web服务器主要是为提供静态内容而设计的，不过大多数Web服务器都有插件来支持脚本语言，比如Perl、PHP、ASP、JSP等，通过这些插件，这些服务器就可以生成动态的HTTP内容。

> Most of the application servers have Web Server as integral part of them, that means App Server can do whatever Web Server is capable of. Additionally App Server have components and features to support Application level services such as Connection Pooling, Object Pooling, Transaction Support, Messaging services etc. 大多数应用服务器都将Web服务器作为其不可分割的一部分，这意味着应用服务器可以做任何Web服务器所能做的事情。此外，应用服务器有组件和特性来支持应用级服务，如连接池、对象池、事务支持、消息传递服务等。

> As **web servers are well suited for static content** and **app servers for dynamic content**, most of the **production environments have web server acting as reverse proxy to app server**. That means while servicing a page request, static contents (such as images/Static HTML) are served by web server that interprets the request. Using some kind of filtering technique (**mostly extension of requested resource**) web server identifies dynamic content request and transparently forwards to app server. 由于web服务器非常适合用于提供静态内容，而应用服务器适合提供动态内容，因此大多数生产环境都有web服务器充当应用服务器的反向代理。这意味着在页面请求时，web服务器会通过提供静态内容(例如图像/静态HTML)来解释请求，并且它还会使用某种过滤技术(**主要是请求资源的扩展**)识别动态内容请求，并透明地转发到应用服务器。

> Example of such configuration is Apache HTTP Server and Oracle (formerly BEA) WebLogic Server. Apache HTTP Server is Web Server and Oracle WebLogic is Application Server.

> **In some cases the servers are tightly integrated such as IIS and .NET Runtime. IIS is web server. When equipped with .NET runtime environment, IIS is capable of providing application services.**


---------------

相对于Web服务器，该容器新增或强化了以下模块：

* 分配线程池资源
> 容器为每个请求分配一个线程进行处理，通常采取线程池的方式高效理由CPU算资源。

* 封装Request上下文
> 一个请求对应一个Request上下文，它主要封装了用户请求的主要构成：URL,HTTP请求头，以及基于请求头构建的Session,Cookie等对象，方便编程使用。

* 封装Response上下文
> 一个请求对应一个Response上下文，主要用于向用户代理返回资源。可以在其中写入输出流，或者重定向，或者返回错误码等等。

* URL路由
> 在容器里，运行开发人员设置不同的路由匹配规则，比如让.HTM返回.HTML,也可以自定义.xyz返回.HTML资源。更加灵活的配置可以参考JAVA MVC或者ASP.NET MVC的配置方案。

* 动态资源处理模块
> 通常在这里具体的容器和开发语言都有自己的高效开发模型，比如JAVA的Servlet,ASP.NET的Web Form,MVC。

* 回收资源
> 这里会回收刚才的线程资源，为了线程复用，除非服务器空闲一般会将线程返回线程池。


可以看出,Web容器(App Server)本身具备了做为一个Web服务器的功能,事实上通常实现Web容器(App Server)功能的服务器就是一个Web服务器.比如Tomcat , IIS ,Jetty。