# publish asp net core app to IIS

> IIS上部署 asp net core web api 应用

### 1. Install the .NET Core Windows Server Hosting bundle

链接： https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/?tabs=aspnetcore2x#install-the-net-core-windows-server-hosting-bundle


### 2. new application pool of No Managed Code 

新建非托管应用程序池

### 3. next

剩余步骤同普通IIS web application 发布


### 4. others

``` cmd
C:\WINDOWS\system32>net stop was /y
The following services are dependent on the Windows Process Activation Service service.
Stopping the Windows Process Activation Service service will also stop these services.

   World Wide Web Publishing Service

The World Wide Web Publishing Service service is stopping.
The World Wide Web Publishing Service service was stopped successfully.

The Windows Process Activation Service service is stopping.
The Windows Process Activation Service service was stopped successfully.


C:\WINDOWS\system32>net start w3svc
The World Wide Web Publishing Service service is starting.
The World Wide Web Publishing Service service was started successfully.
```

Windows Process Activation Service  -  was

World Wide Web Publishing Service  -  w3svc