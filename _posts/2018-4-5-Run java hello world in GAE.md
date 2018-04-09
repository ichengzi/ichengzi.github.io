`PS > mvn appengine:run`

``` 
appengine-maven-plugin
jacoco-maven-plugin
maven-resources-plugin
maven-compiler-plugin
versions-maven-plugin
maven-surefire-plugin
maven-war-plugin
```


gcloud auth list  授权用户

gcloud config list project  当前project

aka  -- also known as, 又叫做


-------
## What is war file?
**WAR file**  --  Web Application Resource or Web application ARchinve is a file  used to distribute a collection of **JAR-files, JavaServer Pages, Java Servlets, Java classes, XML files, tag libraries, static web pages (HTML and related files) and other resources** that together **constitute a web application**.



--------
## IDEA 注释
1、一次性添加多行注释的快捷键

首先选中要注释区域，然后

ctrl+/        这个是多行代码分行注释，每行一个注释符号

ctrl+shift+/    这个是多行代码注释在一个块里，只在开头和结尾有注释符号



2、取消多行注释快捷键

怎样添加快捷键的，用相同方法取消，

如 ctrl+/  添加注释，则ctrl+/取消注释

ctrl+shift+/添加注释，则ctrl+shift+/取消注释


----------
## App engine overview

Each service consists of source code and a configuration file.

All the services in an application share **the state of the Datastore and Memcache services**. They can also collaborate by assigning work between them to Task Queues.

Calls to these APIs are **automatically mapped to the application's namespace.**


## Instances
**Instances** are the **basic building blocks of App Engine**, providing all the resources needed to successfully host your application. This includes `the language runtime, the App Engine APIs, and your application's code and memory`. Each instance includes a security layer to ensure that instances cannot inadvertently affect each other.

Instances are `resident(持续的)` or `dynamic`. A dynamic instance starts up and shuts down automatically based on the current needs. A resident instance runs all the time, which can improve your application's performance.

An instance `instantiates(实例化)` the code which is included in an App Engine service.

The `scaling class` that you `assign to a service` determines the kinds of instances that are created:

* Manual scaling services use resident instances.
* Basic scaling services use `dynamic instances`.
* Auto scaling services use dynamic instances; however, if you specify a number, `N, of minimum idle instances, the first N instances will be resident`, and additional dynamic instances will be created as necessary.

_App Engine charges for instance usage on an hourly basis_(按小时计费)


Each instance has its own `queue for incoming requests`. App Engine monitors the number of requests waiting in each instance's queue. If App Engine detects that queues for an application are getting too long due to increased load, it automatically creates a new instance of the application to handle that load.（实例负载）

Setting an appropriate number of idle instances for your application based on request volume allows your application to **serve every request with little latency**, unless you are `experiencing abnormally high request volume(经历反常的高流量)`.


## Instance startup&shutdown
Manual, basic, and automatically scaling instances startup differently. 

Automatically scaling instances do not receive any `/_ah/start` request.

You can `register a shutdown hook`. When App Engine begins to shut down an instance, `existing requests are given 30 seconds to complete`, and new requests immediately return 404.

As soon as App Engine starts to shut down an instance, all new requests immediately return 404. **If the instance is idle and there is a shutdown hook, the hook runs immediately**. If the instance is **handling a request, it is given 30 seconds to finish before the shutdown hook is called**. If the handler does not complete, it will be interrupted and the hook will run.

When App Engine starts to shut down an instance, it sends an `/_ah/stop` request that appears in the log but is ignored by the request handling logic and cannot be handled by user code.

## Loading requests
When App Engine creates a new instance for your application, **the instance must first load any libraries and resources required to handle the request**. This happens during the first request to the instance, called **a Loading Request**. During a loading request, your application undergoes initialization which causes the request to take longer.

* `/_ah/start`
* `/_ah/stop`
* `/_ah/warmup`, 用于解决 loading request

* downtime  停机时间
* uptime  开机时间

For **long-running computations**, checkpoint the state from time to time so you can resume it if it doesn't complete.

This cost will be **higher for Java applications than Python**.

## Billing is slightly different in resident and dynamic instances
* For resident instances, billing ends fifteen minutes after the instance is shut down.
* For dynamic instances, billing ends fifteen minutes after the last request has finished processing.

## URL Fetch Api

**一个有意思的api，可以试下爬虫**

## Microsercives on App Engine

Microservices refers to **an architectural style for developing applications**. Microservices allow a large application to be **decomposed into independent constituent parts(分解成独立的成分单元)**, with each part having its own **realm of responsibility(领域职责)**. To serve a single user or API request, a microservices-based application can call many internal microservices to compose its response.

> App Engine Services as microservices

There are **pros and cons(利弊)** to using projects instead of services, and you must balance the tradeoffs depending on your situation.

An App Engine app must not respond slowly. **A web request to an application must be handled within 60 seconds. (10 minutes for TaskQueue requests)** Processes that exceed this limit to respond are terminated to avoid overloading the web server.

Note that the only place where users can write files is the `/tmp` directory. Files in `/tmp` will consume the memory allocated to your instance.

The usual way for your application to get resource files is to package the files you rely on with your application `under WEB-INF as resources` using either` Class.getResource()` or `ServletContext.getResource().` **By default, all files in the WAR are "resource files"**. You can exclude files from this set using the appengine-web.xml file.

When using threads, use high level concurrency objects, such as `Executor` and `Runnable`. Those take care of many of the `subtle but important details（微妙但重要的细节）` of concurrency like `Interrupts` and `scheduling` and `bookkeeping`.

The maximum number of concurrent background threads created by the App Engine API is 10 per instance. (**This limit doesn't apply to regular Java threads unrelated to the App Engine API**.)