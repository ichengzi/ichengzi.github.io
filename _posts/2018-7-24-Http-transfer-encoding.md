### https://www.tuicool.com/articles/6fIzEbn

``` http
request:
Accept-Encoding: gzip
Connection: keep-alive

response:
Content-Encoding: gzip
Connection: keep-alive
Transfer-Encoding: chunked
Set-Cookie: name=abc;path=/;domain=baidu.com
```

## Persistent Connection(持久连接)

在早期的 HTTP 协议中，传输数据的顺序大致分为发起请求、建立连接、传输数据、关闭连接等步骤，而持久连接，就是去掉关闭连接这个步骤，让客户端和服务端可以继续通过此次连接传输内容。

而在 HTTP/1.1 协议中，发现持久连接的重要性了，它规定所有的连接必须都是持久的，除非显式的在报文头里，通过 Connection:close 这个首部，指定在传输结束之后会关闭此连接。

----------

长连接带来了另外一个问题，如何判定当前数据发送完成。在保持持久连接的情况下，依赖 Content-Length 来确定数据发送完毕。

理想情况下，我们在响应一个请求的时候，就需要知道它的内容实体的大小。但是在实际应用中，有些时候内容实体的长度并没有那么容易获得。例如内容实体来自网络文件、或者是动态生成的。这个时候如果依然想要提前获取到内容实体的长度，只能开一个足够大的 Buffer，等内容全部缓存好了再计算。

但这并不是一个好的方案，**全部缓存到 Buffer 里，第一会消耗更多的内存，第二也会更耗时，让客户端等待过久**。

此时就需要一个新的机制，不依赖 Content-Length 的值，来判定当前内容实体是否传输完成，此时就需要 Transfer-Encoding 这个头部来判定。

前面也提到，Transfer-Encoding 在最新的 HTTP/1.1 协议里，就只有 chunked 这个参数，标识当前为分块编码传输。

分块编码传输既然只有一个可选的参数，我们就只需要指定它为 Transfer-Encoding:chunked ，后续我们就可以将内容实体包装一个个块进行传输。

![http-client-server-chunked](/images/http-client-server-chunked.webp)

## trailer 
我们使用 chunked 进行分块编码传输的时候，传输结束之后，还有机会在分块报文的末尾，再追加一段数据，此数据称为拖挂（Trailer）。

一般我们会使用拖挂来传递一些在响应报文开始的时候，无法确定的某些值，例如：Content-MD5 首部就是一个常见的在拖挂中追加发送的首部。和长度一样，对于需要分块编码传输的内容实体，在开始响应的时候，我们也很难算出它的 MD5 值。