### .Net Thread 类型与演进
``` cs
system.Threading.Thread
                .ThreadPool
                .Tasks.Task
                .Tasks.Task<TResult>（有泛型返回结果，但没有泛型输入）
                .Tasks.TaskFactory
                .Tasks.TaskScheduler
```

### Thread
Thread类默认创建的是**前台线程**，所以我们前面创建的线程全部都是前台线程。只要有一个前台线程在运行，应用程序的进程就在运行。**如果有多个前台线程在运行，而Main()方法（主线程）结束了，应用程序的进程就仍然是激活的，直到所有前台线程完成其任务为止**。

那后台线程呢？显然和前台线程相反。当主线程结束后，应用程序的进程就终止了，在所有前台线程结束后，后台线程就会被终止。

### lambda 表达式

- Func<...>
- Action<...>
- Expression<...>

