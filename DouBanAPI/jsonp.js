/* 封装数据  跨域url  params fn */
function crossDomain(url,params,fn){
    var head = document.getElementsByTagName('head')[0];
    // 1. 处理回调函数
    var cbName = 'jsonp'+ (Math.random() * Math.random()).toString().substr(2) + new Date().getTime();
    /* 将回调函数挂载到window对象上 */
    window[cbName] = function(data){
        fn(data);// 拿到并处理数据
        //head.removeChild(scriptObj);// 拿到数据后remove掉
    }
    // 2. 解析url
    var qstring = '';
    for(var key in params){
        qstring += key + '=' + params['key'] + '&';
    }
    qstring += 'callback=' + cbName;
    url += '?' + qstring;
    // 3. 插入script
    var scriptObj = document.createElement('script');
    scriptObj.src = url;
    
    head.appendChild(scriptObj);
}

/*  使用  */
crossDomain('https://api.douban.com/v2/movie/in_theaters',{},function(data){
    console.log(data);
    document.getElementById("czDiv").innerHTML = data.title;
})