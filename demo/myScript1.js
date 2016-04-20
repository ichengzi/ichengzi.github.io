// TypeScript
function greeter(person) {
    return "Hello, " + person;
}

function message()
{
    //alert("5000毫秒了")
	document.getElementById("chengzi").innerHTML += ("5000毫秒了");
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