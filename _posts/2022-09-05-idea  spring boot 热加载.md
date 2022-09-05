背景： 一个后台管理项目， 使用  spring boot + freemarker来实现，需要在开发时支持热加载。

## 1. 添加spring boot 依赖
``` xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

> 原理
使用了两个 ClassLoader ，一个 ClassLoader 用来加载那些不会变的类（如：第三方Jar包），`另一个 ClassLoader 加载会更改的类，称为 restart ClassLoader，这样在有代码更改时，原来的 restart ClassLoader 被丢弃，重新创建一个 restart ClassLoader`。如此一来，由于需要加载的类比较少，所以实现了较快的重启。

> 发生时机
`devtools` 会监听 classpath 下的文件变动，并会立即重启应用

## 2. idea 配置
`Preference -> Compiler -> Build project automatically`

## 3. idea 配置 2

`Preference -> Advanced Settings -> Allow auto-make to start even if developed application is currently running`

## 4. 其他

- 如果未生效， 尝试重启 idea
- 网页未刷新， 强制刷新页面 或 `chrome -> F12 -> Network -> Disable cache`
- freemarker 配置：
``` yml
spring.freemarker.cache=false
spring.freemarker.settings.template_update_delay=0
```

参考:
1. [https://blog.csdn.net/DreamStar2560/article/details/106311520](https://blog.csdn.net/DreamStar2560/article/details/106311520)