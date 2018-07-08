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

### dotnet run linux 缺失文件

> Microsoft.ApplicationInsights.AspNetCore.dll is missing

``` bash
 An assembly specified in the application dependencies manifest (MyApp.deps.json) was not found:
    package: 'Microsoft.AspNetCore.Antiforgery', version: '2.0.1'
    path: 'lib/netstandard2.0/Microsoft.AspNetCore.Antiforgery.dll'

  This assembly was expected to be in the local runtime store as the application was published using the following target manifest files:
    aspnetcore-store-2.0.3.xml
```

I have arch linux (not officially supported).

``` bash
dotnet new empty
dotnet publish -o ./published
dotnet published/<ProjectName>.dll
and that error is presented
```

but
``` bash
//I added runtime identifier for linux
dotnet publish -o ./published -r linux-x64
dotnet published/<ProjectName>.dll
this works.
```
So perhaps try to specify **runtime identifier  -r linux-x64** when you publish your application.

https://github.com/dotnet/coreclr/issues/13542

--> https://github.com/aspnet/aspnet-docker/issues/286

Workaround also works for Ubuntu. Seems like you have to specify your target runtime environment:

`dotnet publish -c release -o publish -r linux-x64`

This is not the case when using the SDK


### dotnet core ubuntu

`dotnet publish -c release -o publish -r linux-x64`

`nohup dotnet run -c release &`