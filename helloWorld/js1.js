$(document).ready(function () {
    // $("div")
    // .html("Hello, World!")
    // .css('color','sky');

    var div = document.getElementsByTagName('div'); //dom对象

    //将dom节点div转化为$div的jquery对象
    $div =  $(div);
    var $first = $div.first(); //找到第一个div元素
    $first.css('color', 'red'); //给第一个元素设置颜色

    $('#div2')
    .html("Hello chengzi");

    $('div')
    .css('text-align','left');

    var rq = new XMLHttpRequest();
    rq.open("GET","xx",true);//同源限制，这个测试错误
    rq.send();
    rq.onreadystatechange = function(){
        if(rq.readyState ===4 && rq.status === 200){
            document.write("200 ok baiduc.om");
        }
    }
});
