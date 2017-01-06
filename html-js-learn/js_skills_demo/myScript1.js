// TypeScript
function greeter(person) {
    return "Hello, " + person;
}

function message()
{
    //alert("5000毫秒了")
	document.getElementById("chengzi").innerHTML += ("5000毫秒了");
    
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if(!window.indexedDB)
    {
        console.log("你的浏览器不支持IndexedDB");
        document.getElementById("chengzi").innerHTML += ("你的浏览器不支持IndexedDB");
    }
    else
    {
        document.getElementById("chengzi").innerHTML += ("你的浏览器支持IndexedDB");
    }
}

function timer()
{
    //document.writeln(user);
    if(i<15)
    {
        document.getElementById("chengzi").innerHTML += ("hello---chengzi"+"<br>");
        i++;
    }
    //document.getElementById("chengzi").innerHTML = "";
    //var dd = document.getElementById("chengzi").innerHTML;
}

var user = "Jane User";
var i = 1;
//document.body.innerHTML = greeter("jane");
document.writeln("jane user");
document.writeln(user);
document.writeln("<h1>Hello World!</h1>");
setInterval("timer()",100);
setTimeout(message,5000);