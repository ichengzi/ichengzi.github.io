// var http = require('http');
// var url = require('url');
// var util = require('util');
// var querystring = require("querystring");

// var hello = querystring.parse('hello=Node&hello2=Node2').hello;
// var hello2 = querystring.parse('hello=Node&hello2=Node2').hello2;
// console.log("hello值为：" + hello + "; hello2值为：" + hello2);

// var server = http.createServer(function(req,res){
//         res.writeHead(200 , {"Content-Type":"text/html"});
//         res.end("YOU require : " + util.inspect(url.parse(req.url)));  //重点在这里
// });
// server.listen(8888);
// console.log("Your server is started @port 8888");


var http = require('http');
var url = require('url');
var querystring = require('querystring');
var util = require('util');
var server = http.createServer(function (req, res) {
    var query = url.parse(req.url,true).query;
    var pathname = url.parse(req.url).pathname;
    // var username = querystring.parse(url.parse(req.url).query).username;
    // var email = querystring.parse(url.parse(req.url).query).email;
    var username = query.username;
    var email = query.email;
    console.log(pathname);
    if (pathname == "/index") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("Your username is : " + username + "</br>");
        res.write("Your email is : " + email);
        res.end();
    } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>I can't find the page! Please visit /index...</h1>");
    }
});
server.listen(8888);
console.log("Pleaes viste: http://localhost:8888/index?username=zhangsan&email=1@qq.com");