> 参考: https://blog.logrocket.com/axios-vs-fetch-best-http-requests/

> fetch 用于浏览器网络调试挺方便，但是易用性没 axios 好，如果有大量定制化请求还是得有一个库来封装，方便使用

## 浏览器已经原生支持  fetch()， 调试网页时已经可以使用

```js
fetch('https://httpbin.org/get')
    .then(res => res.json())
    .then(data => console.log(data));
```

## 一次请求多个接口

```js
axios.all([
  axios.get('https://api.github.com/users/iliakan'), 
  axios.get('https://api.github.com/users/taylorotwell')
])
.then(axios.spread((obj1, obj2) => {
  // Both requests are now complete
  console.log(obj1.data.login + ' has ' + obj1.data.public_repos + ' public repos on GitHub');
  console.log(obj2.data.login + ' has ' + obj2.data.public_repos + ' public repos on GitHub');
}));
```

```js
Promise.all([
  fetch('https://api.github.com/users/iliakan'),
  fetch('https://api.github.com/users/taylorotwell')
])
.then(async([res1, res2]) => {
  const a = await res1.json();
  const b = await res2.json();
  console.log(a.login + ' has ' + a.public_repos + ' public repos on GitHub');
  console.log(b.login + ' has ' + b.public_repos + ' public repos on GitHub');
})
.catch(error => {
  console.log(error);
});
```


### 切面， interceptor

```js
axios.interceptors.request.use(config => {
  // log a message before any HTTP request is sent
  console.log('Request was sent');
  return config;
});

axios.interceptors.response.use(config => {
  // log, auth etc..
  console.log('response is done');
  return config;
});

// sent a GET request
axios.get('https://api.github.com/users/sideshowbarker')
  .then(response => {
    console.log(response.data);
  });
```