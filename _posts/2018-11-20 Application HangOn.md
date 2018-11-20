> https://docs.microsoft.com/en-us/windows/desktop/win7appqual/preventing-hangs-in-windows-applications

# Preventing Hangs in Windows Applications

A programmer might recognize **many legitimate reasons** for an application not to instantly respond to user input. 

The application might be busy recalculating some data, or simply waiting for its disk I/O to complete. 

However, from user research, we know that users get annoyed and frustrated after just a couple of seconds of unresponsiveness. 

After 5 seconds, they will try to terminate a hung application. **Next to crashes, application hangs are the most common source of user disruption when working with Win32 applications.**

There are many different root causes for application hangs, and **not all of them manifest(表明) themselves in an unresponsive UI**. However, an unresponsive UI is one of the most common hang experiences, and **this scenario currently receives the most operating system support for both detection as well as recovery**. 

**Windows automatically detects, collects debug information, and optionally terminates or restarts hung applications**. Otherwise, the user might have to restart the machine in order to recover a hung application.

### Hangs - Operating System Perspective

When an application (or more accurately, a thread) creates a window on the desktop, **it enters into an implicit contract with the Desktop Window Manager (DWM) to process window messages in a timely fashion**. The DWM posts messages (keyboard/mouse input and messages from other windows, as well as itself) into the thread-specific message queue. 

**The thread retrieves and dispatches those messages via its message queue**. If the thread does not service the queue by calling GetMessage(), messages are not processed, and the window hangs: it can neither redraw nor can it accept input from the user. 

The operating system detects this state by attaching a timer to pending messages in the message queue. **If a message has not been retrieved within 5 seconds, the DWM declares the window to be hung**. You can query this particular window state via the IsHungAppWindow() API.（5s无响应，OS认为应用 Hang）

Finally, and this is important, unresponsiveness cannot be fixed like a code bug; **it requires upfront work during the design phase.** 

**Trying to retrofit an application's existing code base to make the UI more responsive is often too expensive(改进程序已有代码让其更具响应性， 需要花费巨大的代价)**. The following design guidelines might help.

**The UI thread's primary responsibility is to retrieve and dispatch messages.**
> UI线程的主要职责是获取消息和分发调度消息。


## Do Not

-  Use TerminateThread() on any of your worker threads. **Terminating a thread in this way will not allow it to release locks or signal events** and can easily result in orphaned synchronization objects

## Do

- Use asynchronous window message APIs in your UI thread, especially by replacing SendMessage with one of its **non-blocking peers: PostMessage, SendNotifyMessage, or SendMessageCallback**

- 