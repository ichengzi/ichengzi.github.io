---
tags: redis rate-limiter
---

不同于单纯的counter，rate limiter 在counter基础上增加了时间的限制

三种实现方式：

### 1.redis incr

``` java
boolean incrCounter(key, limit, expire_seconds){
    int cur = redis.incr(key)
    if(cur == 1){
        redis.expire(key, expire_seconds)
    }
    if(cur > limit){
        if(redis.ttl(key) == -1){
            // 如果超过限制， 并且key未设置过期时间， 表示key设置过期时间异常
            // 可以删除key或者重新设置过期时间
            //redis.del(key);
        }
        return false;
    }
    return true;
}
```
优点
1. 不需要lua脚本
2. 内存消耗小

缺点
1. incr 和 expire 非原子性，可能会出现key未设置过期时间
2. 如果未设置过期时间， 可能会导致计数异常， 影响业务

### 2.redis list

``` java
boolean incrCounter(key, limit, expire_seconds){
    int len = redis.llen(key)
    if(len >= limit){
        return false;
    }

    if(len > 0){
        // 如果key已过期， 不塞入数据
        redis.rpushx(key,"占位符或者实际意义id，uid, request_id...")
    }else{
        // 如果多次调用，只是多次设置了expire，不太影响业务
        redis.multi();
        redis.push(key,"");
        redis.expire(key,"");
        redis.exec();
    }
}
```

优点
1. 不需要lua脚本
2. 事务方式， 不会出现key未设置过期时间的问题

缺点：
1. 消耗内存大
2. 每次incrCounter(), 都需要两次调用redis


### 3.redis lua 脚本

```lua
local ts = tonumber(ARGV[1])
local key = KEYS[1]
local current = redis.call("incr", key)
if current == 1 then
    redis.call("expire", key, ts)
end
return current
```

消耗内存小，执行速度也好， 也保证了原则性， 就是需要开启lua脚本权限（在线上环境，运维难度大，容易导致redis不稳定）