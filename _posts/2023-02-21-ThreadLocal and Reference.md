---
tags: ThreadLocal WeakReference ReferenceQueue Finalizer java
---

## weak reference 是什么?
https://www.baeldung.com/java-weak-reference

https://www.jianshu.com/p/964fbc30151a

WeakReference如字面意思，弱引用， 当一个对象仅仅被weak reference（弱引用）指向, 而没有任何其他strong reference（强引用）指向的时候, 如果这时GC运行, 那么这个对象就会被回收，不论当前的内存空间是否足够，这个对象都会被回收


## 内存泄漏的定义

内存泄漏（Memory Leak）是指程序中已动态分配的堆内存由于某种原因程序未释放或无法释放，造成系统内存的浪费，导致程序运行速度减慢甚至系统崩溃等严重后果。 

> In computer science, a memory leak is a type of resource leak that occurs when a computer program incorrectly manages memory allocations in a way that memory which is no longer needed is not released. 

1. [Memory_leak](https://en.wikipedia.org/wiki/Memory_leak)
2. [内存泄漏](https://baike.baidu.com/item/%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F/6181425)

## threadLocal 的工作机制

1. Thread 对象有一个 `threadLocals` 字段， 是一个map
2. map的key就是 `ThreadLocal`对象， value是具体的值
3. threadLocal 只是起到key的作用，它不是容器， 真正的容器是map
4. threadLocal 变量的读写实际是读写的map



## threadLocal 忘记手动remove一定不会释放吗？

不是，threadLocalMap 中的Entry继承了 weakReference，当**key被GC回收**后，是有机会回收value的。

有两个限制：

1. expungeStaleEntry() 实现了回收逻辑，当线程执行threadLocal的读写时，会触发清理逻辑，但不是每次读写都一定触发。 如果线程死锁或阻塞，无法执行代码， 也就无法再执行清理逻辑。
2. 如果key被定义为staic字段， 当类没有被卸载， 就不可能被GC回收，value也不可能释放(这种静态字段的threadLocal变量， 唯一释放的方法就是手动remove)。

```java
// The entries in this hash map extend WeakReference, 
// using its main ref field as the key (which is always a ThreadLocal object)
static class Entry extends WeakReference<ThreadLocal<?>> {
    /** The value associated with this ThreadLocal. */
    Object value;
    Entry(ThreadLocal<?> k, Object v) {
        super(k);
        value = v;
    }
}
```

## 无法释放会导致什么问题？

1. 如果没有重新赋值， 直接读取使用可能导致执行结果不符合预期
2. 如果value size很大， 无法释放会导致内存耗尽

## 为什么需要reference？

JAVA对象引用体系除了强引用之外，出于对性能、可扩展性等方面考虑还特地实现了四种其他引用：SoftReference、WeakReference、PhantomReference、FinalReference.

Reference 和 GC实现机制是紧密结合的。

## 为什么需要 referenceQueue?

**Reference 有个静态字段的链表(.pending)，GC 会把释放的对象(不可达的对象)链接到后边， referenceHandler 线程再把它添加到创建reference时指定的refQueue。**

如果需要接受对象不可达通知，可以传入一个，就像 WeakHashMap 那样。

如果不需要接受对象不可达通知， 可以不传， 就像ThreadLocal.ThreadLocalMap 那样。

ThreadLocalMap 在get key hash冲突时去检查一下key的可达性， 决定是否要 expunge； 从清理性能来看， 没有weakHashMap 高效。

但是一般也不会往 threadLocalMap中放太多对象， 二来threadLocal的最佳实践是set()后要手动remove(), 所以也不太会有啥问题。

参考： [话说ReferenceQueue](https://hongjiang.info/java-referencequeue/)


> refQueue的作用?

1. 没有refQueue， 为了确定哪些entry可以释放，就只能遍历  或 随机(threadLocalMap的方式)
2. 有 refQueue， refQueue存放了可以释放的reference, 可以显著提升性能

#### refQueue的生产消费机制

1. GC 把可回收对象链接到 .pending 末尾，唤醒 referenceHandler
2. referenceHandler 把 reference 分发到每个refQueue
3. 具体的使用方再读取refQueue 实现自己的清理逻辑

```java
ReferenceQueue.java
// 非阻塞
public Reference<? extends T> poll()
// 阻塞
public Reference<? extends T> remove(long timeout)
// 阻塞
public Reference<? extends T> remove()
```


## FinalReference(Finalizer)

`Finalizer.unfinalized`的静态字段是个双向链表， 每一个实现 finalize 方法的对象在创建时都会被加载到这个链表中, 防止GC时对象被直接释放。

VM启动时创建  `Finalizer` 线程， `refQueue.remove()` 阻塞读取待释放对象，读取到后，执行finalize方法清理资源。

`Finalizer 线程优先级不高， 当CPU资源紧张时， 对象的清理时间可能延迟，导致内存无法快速释放`。

取决于-XX:+RegisterFinalizersAtInit这个参数，**默认为true，在调用构造函数返回之前调用Finalizer.register方法**。
如果通过-XX:-RegisterFinalizersAtInit关闭了该参数，那将在对象空间分配好之后就将这个对象注册进去。

参考： [JVM源码分析之 FinalReference 完全解读](http://lovestblog.cn/blog/2015/07/09/final-reference/)


## GC log中的 ref processing 是在做什么？

> What is Reference Processing in garbage collection process?

During normal GC phase, reference object are queue for post processing.

"Ref Proc" phase starts after main GC phase, so it is known which objects have survived and which are not, so reference semantic could be applied.

"Ref Enq" is done afterward to place reference into reference queues (reference queue is a Java object on heap, typically used to implement patterns enabled by special references).




## g1 reference process 代码 (HotSpot，jdk1.8)

```cpp
concurrentMark.cpp
      GCTraceTime t("GC ref-proc", G1Log::finer(), false, g1h->gc_timer_cm(), concurrent_gc_id());
      rp->enqueue_discovered_references(executor);

referenceProcessor.cpp
    GCTraceTime tt("SoftReference", trace_time, false, gc_timer, gc_id);
    GCTraceTime tt("WeakReference", trace_time, false, gc_timer, gc_id);
    GCTraceTime tt("FinalReference", trace_time, false, gc_timer, gc_id);
    GCTraceTime tt("PhantomReference", trace_time, false, gc_timer, gc_id);
    GCTraceTime tt("JNI Weak Reference", trace_time, false, gc_timer, gc_id);

    ReferenceProcessor::process_discovered_reflist()
    ReferenceProcessor::enqueue_discovered_references()
    bool enqueue_discovered_ref_helper(ReferenceProcessor* ref,
                                   AbstractRefProcTaskExecutor* task_executor) {
      // Remember old value of pending references list
      // 实际就是写入 java.lang.ref.Reference.pending 静态字段， 这是一个链表
      T* pending_list_addr = (T*)java_lang_ref_Reference::pending_list_addr();
      T old_pending_list_value = *pending_list_addr;

      // Enqueue references that are not made active again, and
      // clear the decks for the next collection (cycle).
      ref->enqueue_discovered_reflists((HeapWord*)pending_list_addr, task_executor);

      // Return true if new pending references were added
      return old_pending_list_value != *pending_list_addr;
    }

java.lang.ref.Reference.java    
  Thread handler = new ReferenceHandler(tg, "Reference Handler");

java.lang.ref.Finalizer.java extends FinalReference<Object>
  Thread finalizer = new FinalizerThread(tg,"Finalizer");
```