document.body.onload = addElement();

function addElement(){
    var el1 = document.createElement("div");
    var el2 = document.createElement("input");

    var node = document.createElement("p");
    node.textContent = "Hello world";
    node.style.display = "inline";
    node.setAttribute("style","display:block");


    el1.appendChild(el2);
    el1.appendChild(node);

    document.body.appendChild(el1);
}

function getAllLinks(){
    var content = document.getElementsByClassName("centent")[0];
    var links = content.getElementsByTagName("a");

    var strs = "";
    for(i=0; i<links.length; i++){
        strs += links[i].href +"\r\n";
    }
    console.log(strs);
}