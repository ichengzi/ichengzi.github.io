程序开发，实际部署环境， 网络可能会很差。 

为了模拟网络延迟很高的情况， 使用 openresty 在转发流量时， 加入sleep延迟. 

(openresty 是基于 nginx 的开发平台， 默认包含了echo 模块)

``` bash
server {
    listen 80;

    location /hello {
        default_type application/json;
        echo_sleep 2.5; #延时 2.5s
        echo "hello world!";
    }

    location ~^/foo/(.*)$ {
        default_type application/json;
        # alias 配置绝对路径，末尾必须目录结尾
        alias /Users/cz/demo/mockData/;
        try_files $1.json =404;
    }

    location /take/ {
        proxy_pass http://127.0.0.1/foo/;
    }

    # path里 添加延时的秒数， eg: take/0.1s/demo, take/1s/demo
    location ~^/take/(.*)s/(.*)$ {
        # 设置变量, $1 就是延时的秒数
        # 设置后， 可以在 lua 模块用 ngx.var.sleepSeconds 读取
        set $sleepSeconds $1;
        access_by_lua_block {
            ngx.sleep(ngx.var.sleepSeconds); 
        }
        proxy_pass http://127.0.0.1/foo/$2$is_args$args;
    }
}
```


1. openresty 官网教程 + lua, https://moonbingbing.gitbooks.io/openresty-best-practices/content/redis/out_package.html
2. m1, /etc/openresty/conf/nginx.conf
3. mac os安装 openresty, https://blog.frognew.com/2021/08/install-openresty-develop-env-on-macos.html
4. openresty echo 模块,  https://github.com/openresty/echo-nginx-module#installation
5. lua-nginx-mod, https://github.com/openresty/lua-nginx-module

6. echo_sleep 和 proxy_pass 冲突, https://github.com/openresty/echo-nginx-module/issues/5

> because nginx location only allows a single handler) and only one will win (which one will win is unspecified). This is similar to results of using proxy_pass and fastcgi_pass in a single location.

7. nginx location 语法 + 正则，  http://nginx.org/en/docs/http/ngx_http_core_module.html#location