若nginx接到的请求的uri是/name/a.html

``` conf
location /name/ {
    proxy_pass http://192.168.30.20/remote/;
} #传送到后端服务器的URI是/remote/a.html

location /name/ {
    proxy_pass http://192.168.30.20;
} #传送到后端服务器的URI是/name/a.html

location /name/ {
    proxy_pass http://192.168.30.20/;
} #注意与上面用法的区别，这里地址末尾带有斜线，实际上被认为定义了URI，该“/”会替换“/name/"，传送到后端服务器的URI是/a.html。
```


- proxy_cookie_domain
- proxy_cookie_path
- proxy_hide_header
 nginx默认不会将“Date”、“Server”、“X-Pad”，和“X-Accel-...”响应头发送给客户端。该指令则可以设置额外隐藏的响应头，这些响应头也不会发送给客户端。
- proxy_pass_header 
相反的，如果希望允许传递某些响应头给客户端，可以使用proxy_pass_header指令。



## 代理流程
`客户端=>（正向代理=>透明代理=>服务器反向代理=>）Web服务器`

其中正向代理、透明代理、服务器反向代理这三个环节并不一定存在。

什么是正向代理呢，很多企业会在自己的出口网关上设置代理（主要是为了加速和节省流量）。

透明代理可能是用户自己设置的代理（比如为了翻墙，这样也绕开了公司的正向代理）。

服务器反向代理是部署在 Web 服务器前面的，主要原因是为了负载均衡和安全考虑。

作者：虞大胆
链接：https://www.jianshu.com/p/792048d08ebc
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。