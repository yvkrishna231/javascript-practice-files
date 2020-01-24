var body = document.body;
body.style = "background-color:aliceblue";

var count = 1;

var maindiv = document.createElement("div");
maindiv.setAttribute("style",
    "text-align: center;width:569px;height:180px;background-color:lightgray;margin: 0 auto;border-radius:50px;margin-top:150px");
body.appendChild(maindiv);

let heading = document.createElement("h1");
heading.style = "font-family:Verdana;color: black;padding:15px";
heading.innerText = "TODO_APP";
maindiv.appendChild(heading);

let inputtext = document.createElement("input");
inputtext.setAttribute("style",
    "text-align:center ;margin-top:10px;margin-right:10px;border-radius:10px;height: 30px;width: 300px;color:black;outline:none");
inputtext.type = "text";
inputtext.placeholder = "add users";
inputtext.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("savedata").click();
    }
});
maindiv.appendChild(inputtext);



var error = document.createElement("p");
error.setAttribute("id", "err");
error.setAttribute("style", "text-align:center;color:red");
error.innerText = "give valid data";

var table = document.createElement("table");
table.id = "tableid";

table.setAttribute("style", "border:4px solid yellow;background-color:white;margin :0 auto;margin-top:10px;border-radius:15px;padding: 22px;");

var tableheader = table.createTHead();
var tablerow = tableheader.insertRow(0),
    cell1 = tablerow.insertCell(0),
    cell2 = tablerow.insertCell(1);
cell1.innerHTML = "sno";
cell2.innerHTML = "username";

tablerow.setAttribute("style", "color:red;border:1px solid yellow");

body.appendChild(table);



let savebutton = document.createElement("button");
savebutton.setAttribute("onclick", "saveuser()");
savebutton.id = "savedata";
savebutton.style = 'height: 36px;width: 54px;border-radius: 13px;outline:none'
savebutton.innerText = "save";
maindiv.appendChild(savebutton);

var edited = document.createElement("button");
edited.setAttribute("id", "putdata");
edited.setAttribute("onclick", "updatingtext(this)");
edited.innerText = "edit";


var deletebutton;
function saveuser() {
    var username = inputtext.value.trim();
    if (!username || username.length == 0) {
        alert(error.innerText);
    } else {
        var edit = document.createElement("button");
        edit.id = "editor";
        edit.innerText = "update";
        deletebutton = document.createElement("button");
        deletebutton.innerText = "delete";
        var childrows = table.insertRow(table.length);
        childrows.insertCell(0).innerHTML = count;
        childrows.insertCell(1).innerText = username;
        childrows.insertCell(2).appendChild(edit);
        childrows.insertCell(3).appendChild(deletebutton);
        edit.setAttribute("onclick", "editing(this.parentElement)");
        deletebutton.setAttribute("onclick", "deleteuser(this.parentElement)");

        inputtext.value = "";
        count = parseInt(childrows.cells[0].innerText) + 1
    };

}

var firstdata, enablebutton;
function editing(updatingdata) {
    for (var i = 1; i <= table.rows.length - 1; i++) {
        document.getElementById("tableid").rows[i].querySelectorAll("td")[3].children[0].disabled = false
    }

    savebutton.setAttribute("style", "display:none");
    if (updatingdata.parentElement.querySelectorAll("td")[1]) {
        enablebutton = updatingdata.parentElement.querySelectorAll("td")[3].children[0];
        enablebutton.disabled = true;
        edited.removeAttribute("style");
        maindiv.appendChild(edited);
        firstdata = updatingdata.parentElement.querySelectorAll("td")[1];

        inputtext.value = firstdata.innerText;
    } else {
        enablebutton.disabled = false;
    }
};

function updatingtext(value) {
    savebutton.setAttribute("style", "display:none");
    updatename = inputtext.value.trim();

    if (!updatename || updatename.length == 0) {
        alert(error.innerText)
    } else {
        firstdata.innerHTML = updatename;
        inputtext.value = "";
        edited.setAttribute("style", "display:none");
        savebutton.removeAttribute("style");
        enablebutton.disabled = false
    }

};

function deleteuser(deletevalue) {
    deletevalue.parentElement.remove();
    var changetable = document.getElementById("tableid");
    var stoploop = changetable.rows.length - 1;
    for (var i = 1; i <= stoploop; i++) {
        changetable.rows[i].cells[0].innerText = i;
    }
    count = 1

}