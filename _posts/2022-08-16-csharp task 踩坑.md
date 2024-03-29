---
tags: dotnet dotnet4 task async
---

.net4 中使用 task 实现异步网络请求，避免阻塞 UI 线程， 但是.net4中对 task 的异常处理很奇怪，会导致应用终止。

### 修改前的代码

```cs
var task = Task.Factory.StartNew(() =>
{
    throw new Exception("error test");
});

不去获取 task 的result, 在 .net4 GC时发现 task 执行异常, 也会导致应用的终止
```

### 解决方案：注册event handler, 避免应用终止
```cs
// after 4.5, CLR 默认忽略这些异常， 不会终止应用 
// https://stackoverflow.com/questions/3284137/taskscheduler-unobservedtaskexception-event-handler-never-being-triggered
System.Threading.Tasks.TaskScheduler.UnobservedTaskException += TaskScheduler_UnobservedTaskException;
private void TaskScheduler_UnobservedTaskException(object sender, UnobservedTaskExceptionEventArgs e)
{
    // task 中未处理的异常， 在GC 回收task对象时，会检查task状态， 
    // .net4默认终止app， .net4.5 默认忽略
    // 所以 .net4 中必须处理
    LoggerX.Fatal("task-未处理异常", e.Exception.ToString());
    e.SetObserved();
}

// 下边代码可以测试验证
public void test_click(){
    var task = Task.Factory.StartNew(() =>
    {
        throw new Exception("error test");
    });

    Thread.Sleep(100);
    GC.Collect();
    GC.WaitForPendingFinalizers();
}
```