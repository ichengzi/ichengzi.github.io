## GAE Credentials
Google uses **credentials** to identify your application for **quota and billing**. Your credentials are also used to authorize access to **GCP APIs, resources, and features**.

Google 使用证书来区分应用的配额和费用。证书用于在访问 google云端api、资源、功能时的授权。

## Providing credentials to your application（为应用提供证书）
**GCP client libraries** use a strategy called **Application Default Credentials (ADC)（一种称之为ADC的策略）** to find your application's credentials. When your code uses a client library, the strategy checks for your credentials in the following order:

1. First, ADC checks to see if **the environment variable GOOGLE_APPLICATION_CREDENTIALS** is set. If the variable is set, ADC uses the service account file that the variable points to.

2. If the environment variable isn't set, ADC uses **the default service account** that Compute Engine, Kubernetes Engine, App Engine, and Cloud Functions provide, for applications that run on those services.

3. If ADC can't use either of the above credentials, an error occurs.

    首先检查环境变量，然后检查应用绑定的服务账户，都失败则返回错误。

---------

## Google的两套API系统
com.google`.cloud.datastore`.Datastore;

com.google.`appengine.api.datastore`


## GAE Cron tasks
gae -> cron.yaml 中定义url不能使用中文，中文需要url编码后才行

`gcloud app deploy cron.yaml` 发布cron任务


---------

## datastore kind 不能使用中文

kind,不要使用中文， index.yaml 文件中需要指定kind，windows gcloud工具使用python写的，中文处理有问题

The index.yaml is located in the `<project-directory>/WEB-INF/` folder. 

`gcloud datastore create-indexes INDEX_FILE`，创建索引

## datastore Index

`Built-in indexes` do not appear in the Indexes page of the Google Cloud Platform Console.

For more complex queries, an application must define composite, or manual, indexes. Composite indexes are required for queries of the following form:

* Queries with ancestor and inequality filters
* Queries with one or more inequality filters on a property and one or more equality filters on other properties
* **Queries with a sort order on keys in descending order**(默认的key排序只能升序，不能倒序)
* Queries with multiple sort orders
* Queries with one or more filters and one or more sort orders

### java

JDO - java data objects
JPA - java persistence api

---------

## nslookup 命令

nslookup, dns查询命令

`nslookup www.google.com` ,使用默认的dns server 查询

`nslookup www.google.com 8.8.8.8` , 使用指定的dns服务器查询


--------

## ubuntu on win10

当win10上开启VPN，会导致 linux subsystem(ubuntu) 的dns功能停止工作。关闭VPN后恢复

## ubuntu 设置sockets 代理

http://aiezu.com/article/linux_bash_set_proxy.html


1、vim ~/.bashrc，在文件尾部添加下面内容：
``` bash
export http_proxy=socks5://10.0.0.52:1080
export https_proxy=socks5://10.0.0.52:1080
export no_proxy="*.aiezu.com,10.*.*.*,192.168.*.*,*.local,localhost,127.0.0.1"
```

2、加载设置:
``` bash
[root@aiezu.com ~]# . ~/.bashrc
[root@aiezu.com ~]# echo $http_proxy
socks5://10.0.0.52:1080
[root@aiezu.com ~]# echo $https_proxy
socks5://10.0.0.52:1080
```

3、测试代理：
``` bash
[root@aiezu.com ~]# curl -I http://www.fackbook.com
HTTP/1.1 200 OK
Content-Length: 2423
Content-Type: text/html
Last-Modified: Mon, 14 Nov 2016 22:03:32 GMT
Accept-Ranges: bytes
ETag: "0521af0c23ed21:0"
Server: Microsoft-IIS/7.5
X-Powered-By: ASP.NET
Date: Sun, 11 Dec 2016 13:21:33 GMT
```