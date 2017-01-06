//定义"改变颜色"的函数
function changeColor(){
    var el= document.getElementById("con");
    el.style.color ="red";
}

//定义"改变宽高"的函数
function changewidth(){
    var el= document.getElementById("con");
    el.style.width = "50px";
}

//定义"隐藏内容"的函数
function chidden(){
    var el= document.getElementById("con");
    el.style.display ="none";
}

//定义"显示内容"的函数

function cshow(){
    var el= document.getElementById("con");
    el.style.display ="block";
}
//定义"取消设置"的函数

function czreset(){
    var res = confirm("重置？");
    if(res === true){

    }
}