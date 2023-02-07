---
tags: spring aop java
---

**多个未声明order的切面， 如何控制切面的执行顺序？**

## AOP报错异常

公司中间件有个功能，是通过切面A(around)引入的， 但是这个A没有实现order。

项目中也有个功能，通过切面B(around)来处理异常和log，两个切面需要切入到同一个方法。

业务代码中， 通过 Assert 来校验参数， 实现了流程控制。

**上线后发现，运行顺序 B->A, 因为是在B中处理的异常， A中总是会走到一堆异常，导致不停告警。**

需要想办法， 调整顺序为 A->B->业务方法


## 排查spring中的多个切面是按什么顺序运行， 是否有办法调整？

1. 尝试给B添加order(order 接口或order注解)，max or min, 顺序都未改变， 仍然是 B->A

2. clone spring code, `https://github.com/spring-projects/spring-framework.git`,  查看spring aop实现代码在 `AnnotationAwareAspectJAutoProxyCreator.java`

3. 多层继承类， 真正实现代码在这里
```java
// AbstractAdvisorAutoProxyCreator.getAdvicesAndAdvisorsForBean()
protected Object[] getAdvicesAndAdvisorsForBean(
        Class<?> beanClass, String beanName, @Nullable TargetSource targetSource) {
    List<Advisor> advisors = findEligibleAdvisors(beanClass, beanName);
    if (advisors.isEmpty()) {
        return DO_NOT_PROXY;
    }
    return advisors.toArray();
}
protected List<Advisor> findEligibleAdvisors(Class<?> beanClass, String beanName) {
    // 查找所有Advisor.class 类
    List<Advisor> candidateAdvisors = findCandidateAdvisors();
    // 查找目标bean的切面
    List<Advisor> eligibleAdvisors = findAdvisorsThatCanApply(candidateAdvisors, beanClass, beanName);
    extendAdvisors(eligibleAdvisors);
    if (!eligibleAdvisors.isEmpty()) {
        // 切面排序。关键点在这里
        eligibleAdvisors = sortAdvisors(eligibleAdvisors);
    }
    return eligibleAdvisors;
}
```

4. OrderComparator
```java
// OrderComparator.doCompare()
private int doCompare(@Nullable Object o1, @Nullable Object o2, @Nullable OrderSourceProvider sourceProvider) {
    // 返回值越小，优先级越高
    // o1,o2 有一个实现了order，谁实现了谁优先级更高
    boolean p1 = (o1 instanceof PriorityOrdered);
    boolean p2 = (o2 instanceof PriorityOrdered);
    if (p1 && !p2) {
        return -1;
    }
    else if (p2 && !p1) {
        return 1;
    }

    // sourceProvider 为null, 返回了默认值
    // i1 == i2,  两个切面相等
    int i1 = getOrder(o1, sourceProvider);
    int i2 = getOrder(o2, sourceProvider);
    return Integer.compare(i1, i2);
}

private int getOrder(@Nullable Object obj, @Nullable OrderSourceProvider sourceProvider) {
    Integer order = null;
    if (obj != null && sourceProvider != null) {
        // 省略，sourceProvider 为null， 这里走不到
    }
    // 返回默认值
    return (order != null ? order : getOrder(obj));
}

protected int getOrder(@Nullable Object obj) {
    if (obj != null) {
        Integer order = findOrder(obj);
        if (order != null) {
            return order;
        }
    }
    return Ordered.LOWEST_PRECEDENCE;
}
```

5. 当都没有实现order时， findCandidateAdvisors() 返回的顺序就是实际的切面执行顺序。 但是这个无法控制(尝试通过 @DependsOn, 未生效)

6. **通过order调整顺序的方法失效**


## 尝试调整代码，两个切面分开

```java
@Service
public class DemoService{
    @A
    @B
    public void f1(){}
    //////////////

    // 方式1： spring 4.3 之后支持了注入本身
    @AutoWired
    DemoService self;
    @A
    public void f1(){
        // call 自己本身aop增强后的方法，需要想办法获取增强后proxy的实例
        self.doF1()
    }
    @B
    public void doF1(){
        // 注意这里必须public, private会导致执行的是非增强方法
    }

    // 方式2 
	private DemoService getSelf(){
		return SpringContextUtil.getBean(this.getClass());
	}
    // 方式3
    private DemoService getSelf(){
		// exposeProxy 必须设置为true
		//@EnableAspectJAutoProxy(exposeProxy=true,proxyTargetClass=true)
		return AopContext.currentProxy() != null ? (UserService)AopContext.currentProxy() : this;
	}
}
```

3种方式都可以获取增强后的实例对象，推荐第一种， 最简单。

## AOP原理总结

当多个切点切到同一个方法时，源码实现流程为：
1. Spring容器启动时先注册AnnotationAwareAspectJAutoProxyCreator类的BeanDefinition（继承自后处理器BeanPostProcessor）
2. 当程序开始调用实际的切面方法要生成bean实例时，会调用其postProcessAfterInitialization方法，此方法**创建代理替换了Bean实例**

> AOP中没有规定不同切面的执行顺序，都是把切面打乱放进了List<Advisor>中, 从放入List中的顺序追溯，可知对应的是Spring加载类后**注册BeanDefinition的顺序**

## 总结

**实现切面时， 切记一定要实现一下order，尤其是公共切面； 否则需要调整多个切面顺序时，会很麻烦**

## 参考

1. [spring aop类内部调用不拦截原因及解决方案](https://blog.csdn.net/dream_broken/article/details/72911148)
2. [spring official document: aop advice order](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#aop-ataspectj-advice-ordering)
3. [AOP切面实现原理以及多个切面切同一个地方时的优先级讲解](https://www.cnblogs.com/zzq6032010/p/10526815.html)