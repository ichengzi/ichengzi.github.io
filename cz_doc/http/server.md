# http的头部 #

## 请求-回应模式 ##

http是非常简单的无状态请求-回应模式协议。每个请求有且仅有一个回应，如果没有算没有完成，如果超过一个就非法了。

所谓无状态，指http请求本身并不记录客户端和服务器端的状态。更通俗一点说，每个在http协议中通过的请求都是可以互换的，同一个请求使用另一个socket应当返回同一结果。不会因为某个请求走在某个链接中而得到特别的优待。

## http通用格式 ##

http的头部格式相当简单，基本分为三个部分。第一行，头部，body。

* 第一行声明一些关键性的信息，在请求中，是method uri version。在响应中，是version code phrase。这是http协议最关键的6个数据，也是一个http要完成必须的6个数据。
* headers是一些属性型信息，通常每行一句，以:分割。也许大家会直觉的想到dict或者map，但实际上header比dict更加的坑一些，他是一种multidict结构。同一个key可以出现多次，对应多个value。因此在严谨的处理headers信息的时候，一般都会采用k-v序对列表。
* body，是http协议中承载的数据。头部应当以一个空行和body分开。

另外，传统上，header的key是首字母大写的，以-分割的单词组。

以下是一个例子

`

`

其中最重要的三个参数，分别是method，uri，code。

## url ##

http在创制之初，就是为了请求和获得服务器上的文件，尤其是超文本文件而产生的。其名称http，是超文本传输协议(TODO)的缩写。因此，http在请求时，必须指定一个路径来请求文件。后来引入动态网页的想法，路径就不被用来表示文件路径，而是资源路径。

一般我们会以TODO表示完整的资源路径。这一描述不仅包含了uri，而且包含主机和登录信息等。完整形态应该是如下格式。

protocol://username:password@host:port/path?params

* protocol，协议。一般是http，也有https的。近几年可能会看到spdy协议。
* username，用户名。如果省略，后面的@不需要写出。
* password，密码。必须跟在用户名后。
* host，主机名，具体看dns解析。
* port，端口号。http协议为80，https协议为443，如果使用默认端口可以省略前面的:。
* path，资源的路径。
* params，参数，一般用于GET。

## method ##

一般译作方法。通常有GET, POST, PUT, DELETE, HEAD, OPTION, CONNECT七个。

* GET: 获得一项资源。默认没有body。所有参数使用uri提交。
* POST: 更新一项资源。或者可以理解为向资源发送一组消息。默认带有body。

## code ##

## body ##

body是请求和回应的体，也是携带数据的地方。每个请求和回应都可以携带一个body，也可以没有。

body是否需要确定长度，是一个很有意思的问题。对于http1.0来说，body是不需要确定长度的。因为http1.0不允许使用pipeline复用连接，所以tcp关闭时，body就结束。当然，为了不受到以外的关闭的影响，一般在头部中会指定body的长度。

到了http1.1协议中，body不能通过简单的tcp关闭来表示。因此在http1.1中有三种表示方法。

* chunk mode: 头部指定了Transfer-Encoding，而且值不为identity。chunk模式的细节我们在下一小节讨论。
* length mode: 头部指定了Content-Length。其值就是长度。
* close mode: 如果有body时，tcp关闭body结束。

何谓有body？

TODO

为何我们不总在头部指定http body的长度？因为很多时候body很长，而且是动态生成的。http虽然是请求-回应模式，但是在传输body的时候，可以当作stream用。如果必须在头部声明长度，就必须将所有输出缓存在内存中，再进行传输。这样会导致很多无效计算和内存的浪费。如果我们可以阻塞在stream写入上，就可以避免这一损失。然而此时，headers已经写出了，无法更改。

## chunk ##

chunk模式的基本想法是在一个流中传输多个小块，每个小块的长度在头部声明。当长度为0时流结束。

每个chunk的头部以换行结束，内容可以用;分割成多个部分。其中第一个部分一定会指名长度。

## 资源是否更新 ##

# 前端负载平衡 #

## CDN ##

## HA ##

## LB ##

## LVS ##

## 应用层分派 ##

# 协议解析和请求路由 #

## 请求路由解析 ##

## http ##

## cgi ##

## fastcgi ##

## uwsgi ##

# 应用层并发模型 #

## 单上下文模型 ##

## 进程池模型 ##

## 线程池模型 ##

## 进程-线程模型 ##

## 状态机模型 ##

## 协程模型 ##

## reactor模型 ##

## 异步回调模型 ##

## 内核模型 ##

# 监管-调度模型 #

应当有很多读者看出来了。无论上述哪种模型，其实做的事情都非常类似。不同之处在于实现的手法不同。

一开始，会有一个用户程序获得执行机会，这个用户程序会做一些初始化动作。这个过程中，程序并不会阻塞。随着程序的执行，程序会发生阻塞行为。所谓阻塞，就是程序并不满足继续执行的条件。例如需要等待数据，需要睡眠一定时间，需要等待锁等等。

在发生阻塞时，有两种处理思路。上下文调度和回调。进程/线程/协程是使用上下文调度，reactor是使用回调。

## 阻塞-调度 ##

我们在这里先不描述调度和回调的区别，转而论述，如果当前CPU（其实如果是协程的话，应当考虑的是当前线程，因为线程还有调度的可能）已经无法执行当前上下文了，那么会如何？

和我们通常预想的“操作系统”不同，系统更多的是以库的形态而非框架的形态存在。当一个系统调用无法立刻返回时，CPU会很快的转换到可以执行的上下文上面去。如果是线程，就是线程调度。如果是协程，就是协程调度。如果都没有，就会调用系统中的idel函数，做一些背景性的工作，例如降低CPU频率，或者阻塞在select函数上，等等。

实际上，无论是如果是线程，那么在IO，sleep，同步原语(例如semaphore)调用时，可能发生调度(其实还有类似的行为还有回调，为了简洁起见，这节对于类似的情况进行了省略，调度和回调只写一个，另一个是否可以并列请按照上下文理解)。如果是协程，那么类似的情况下也应当发生调度。因此，好的IO工具框架应当覆盖一切阻塞条件，包括网络和文件IO，sleep，同步原语和sleep。

## 中断 ##

如果单纯以上面的模型思考，也许很多人会觉得有问题。如果一个上下文始终处于运算状态，没有系统调用，难道就不会被调出么？实际上是这样的。在很久以前的非抢占式操作系统中，一旦一个程序进入死循环，就会占死CPU。而且以系统调用作为调度还有一个缺陷，那就是调度间隔不够均匀。

考虑这样一件事，这是一个单CPU系统，在低优先级有一个很大的计算正在执行，高优先级任务基本不占用CPU，主要就是接收一下用户的输入什么的。

如果是非抢占式调度。在第一次前台任务接收不到用户的输入而进行调度后，后台的计算任务获得了执行机会。有一定概率下，我们刚刚按下了一个键，计算任务就发生了系统调用。因此高优先级任务首先获得了执行机会，响应了用户输入。当然，也存在可能。我们按下键很久才发生了系统调用，因此我们觉得系统特别慢。慢还是次要的，主要问题是，由于计算任务的调用机会不均匀，因此我们可能会觉得系统忽快忽慢。

因此，系统在硬件发生特定情况的时候，会产生中断。发生中断的时候，当前正在执行的东西会忽然停住。CPU会进行一些特殊的操作，在不破坏当前环境的情况下响应硬件事件。当中断完毕的时候，系统会重新考虑调度的事情。唯其如此，系统才能让高优先级的任务比较均匀的得到执行的机会。

而在中断中，有一种特殊的情况叫做时钟中断。由于时钟中断的存在，因此即使你什么键都不按，也没有网络数据，系统仍然可以顺利的进行调度。

在协程这个层面，CPU是无法感知系统中断的。然而系统中存在着和中断差不多的事情——信号。当信号发生时，正在进行的系统调用会中断，系统会优先响应信号。当然，信号比中断糟糕的地方在于，信号无法打断正在执行的代码，也无法从不可中断的系统调用中返回。

## 回调 ##

回调很简单，将需要执行的代码指针和有关本次执行的环境数据保存在事件有关的对象中。当事件发生的时候，进行调用即可。

回调的问题很明显，对于一个持续的逻辑，必须分为调用前和调用后来思考，思考的难度相当高。

## 调度 ##

调度可以将离散的过程转换为连续的过程。调度的核心在于状态的保存和还原。

如果是线程，为了还原状态，就必须保存CPU的所有寄存器。而如果是协程，就必须保存虚拟机中的所有核心状态。当事件发生时，将现场恢复成中断前的状态，以便系统可以继续执行，这就是调度。

顺便说一句，理论上被中断的执行可以被序列化到存储上，从而获得在其他环境下执行的能力。条件是其他环境必须可以将外部条件一同还原——例如打开的句柄等，也必须可以持久化。由于用途太少，因此很少有系统支持这样的事情。然而思考其用途，在虚拟化和迁移上非常有用。

## 中断调度的优势和问题 ##

现代操作系统都是抢占式的，就是说，系统会使用时钟抢断执行上下文的执行权利。这个特性带来便利的同时，也带来了麻烦。由于时钟的不可知性，因此执行代码随时都可能发生中断。如果中断的位置不大巧，就会引发一种被称为“多线程同步问题”的问题。这种问题是程序中最讨厌的东西之一。无法调试，很难重现，而且大多数时候都以破坏逻辑为主。当然，现代编译工具都内置了一些工具来发现潜在可能引起同步问题的代码。然而很少有工具可以保证不存在同步问题。

如果我们有机会在协程内部引发时钟中断的话，那么我们也有机会对协程进程强制中断和调度。除了内存隔离，这基本就实现了一个微型的操作系统。实际上，这种东西存在——使用定时器信号，你有机会使得程序在执行中定时中断。然而，通常性情况下这不会对你的代码有任何改善，反而容易引起问题。

## 取消系统的中断调度 ##

中断调度的问题之一就是由于中断的不可知性而引发的大量锁和同步原语。也因为这个原因，派生了很多无锁编程技巧和IO复用编程。实际上，我们回过来思考整个系统，会发现，实际上我们只要不在任意点进行中断即可。在特定的点进行中断是不一定会产生锁的(这无法消除逻辑锁，但是可以消除同步锁)。

由此，我预测操作系统的一种可能改进就是，可以由某些高权限调用使得线程进入不可中断模式。并且可以由亲缘性设定设置进程的所有线程只有一个可以获得执行机会。在这种模式下，同一个进程内只有一个活跃线程，而且线程只会因为阻塞型系统调用而发生调度，而不会因为中断而发生调度。由此，我们也可以消除同步锁。

当然，这样会导致CPU利用率问题。但是对于这个问题相对比较容易解决，为每个CPU分配一个进程就是了。这并不是一个很大的开销。问题是很多资源并不具备跨进程的特性，因此这种方案会受到相当的限制。

## 同步原语 ##

这一小节内，我们会简单数一下常用的通讯原语：

* 锁
* 互斥区
* 信号量
* 事件
* channel

# 无状态协议中的状态 #

## cookie和session ##

## 上下文无关协议 ##

## 竞争访问 ##

# 数据库连接 #

## 原子性 ##

## 持久性 ##

## 一致性 ##

## 隔离性 ##

## 行级锁和表级锁 ##

## WAL ##

# 回应 #

## 回应结构 ##

## 懒回应 ##

## 回应状态 ##

## 缓存时间 ##

## pipeline ##
