---
tags: spring beanPostProcessor beanFactoryPostProcessor java
---

## 错误示范

示例代码： 
```java
package com.example.demo;

public class AppTest {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
        ctx.scan("com.example.demo");
        ctx.refresh();

        ServiceA bean = (ServiceA) ctx.getBean("serviceA");
        System.out.println(bean);
    }
}
@Component
@Slf4j
public class ServiceA implements BeanFactoryPostProcessor
{
    private ServiceB serviceB;
    public ServiceA(ServiceB serviceB) {
        this.serviceB = serviceB;
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory configurableListableBeanFactory) throws BeansException {
        log.info("---post factory---");
    }
}
@Component
@Slf4j
public class ServiceB {
    public void printHello() {
        log.info("---hello serviceB---");
    }
}
```

```log
Caused by: org.springframework.beans.BeanInstantiationException: Failed to instantiate [com.example.demo.ServiceA]: No default constructor found
Caused by: java.lang.NoSuchMethodException: com.example.demo.ServiceA.<init>()
```

错误输出， 提示找不到 ServiceA 的默认构造函数。 

## 错误分析

serviceA 依赖了ServiceB， 如果它只是个普通的 @Component,  那么spring是能够创建 serviceB， 然后创建serviceA的。

但是serviceA 实现了 `BeanFactoryPostProcessor`, 这将导致 serviceA 提前创建，在这个点时， 还没到普通bean的创建阶段， spring 无法用 `ServiceA(ServiceB serviceB)` 构造函数来创建实例， 只能fallback到默认空构造函数， 但是不存在空constructor, 就导致bean创建失败。


## spring 启动过程分析

AbstractApplicationContext.refresh() // spring-context.jar

1. 刷新的预准备
2. 获取 BeanFactory
3. `执行beanFactoryPostProcessor --> 修改或增加bean definition`，如果beanFactoryPostProcessor本身需要注入其他的bean，那么这个bean的创建就会被提前。
4. `执行beanPostProcessor --> 拦截整个Bean的创建过程`，如果beanPostProcessor本身需要注入其他的bean，那么这个bean的创建就会被提前。


#### 注意避免BeanPostProcessor启动时对依赖的Bean造成误伤

`BeanPostProcessor`本身也是一个Bean，一般而言其实例化时机要早过普通的Bean，但是BeanPostProcessor有时也会依赖一些Bean，这就导致了一些普通Bean的实例化早于 `BeanPostProcessor` 的可能情况，由此如果使用不当，就会造成一些问题。

导致这个现象的原因：就是我们在开发过程中，因为不清楚Spring容器对BeanPostProcessor、Bean的装载顺序，从而导致有时候我们需要提前用到Bean的功能，从而导致启动时的"误伤"。



## 参考文章

1. [Spring @Autowired 失效 BeanFactoryPostProcessor 错误姿势](https://blog.csdn.net/Ailubby/article/details/104320778)
2. [注意BeanPostProcessor启动时对依赖Bean的“误伤”陷阱](https://blog.csdn.net/f641385712/article/details/89737791)
3. [springboot Bean提前加载未被BeanPostProcessor增强处理导致aop注解切面失效及解决办法](https://www.jianshu.com/p/916a7d8311bf)
```
shiro模块的Bean被提前加载是无法解决的，只能延迟其中注入的Service加载时间。
{
    @Autowired
    @Lazy
    private TestService testService;
}
如上，附上Spring的@Lazy注解就行了，或者使用@Autowired的required = "false"，然后在调用处主动校验并从上下文获取Service实例。很明显用@Lazy方便多了。
```

若是实现ApplicationContextAware接口的话，ApplicationContext不管咋样都可以被正常获取到。道理也是一样的，是因为这个接口是被ApplicationContextAwareProcessor来解析的，而它已经早早被放进了Spring容器里面，所以通过实现接口的方式任何时候都是阔仪的.






