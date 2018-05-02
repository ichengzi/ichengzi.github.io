## 安装nginx

``` bash
sudo apt-get install nginx

sudo service ngnix start

```
https://github.com/Microsoft/dotnet-core-sample-templates/blob/master/dotnet-core-music-linux/music-app/nginx-config/default

``` bash
cd /etc/nginx/sites-available
sudo vim default
```

``` 
server {
    listen 80;
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```


``` bash
sudo nginx -t  # test

sudo nginx -s reload
```

## dotnet run 

记得匹配好端口