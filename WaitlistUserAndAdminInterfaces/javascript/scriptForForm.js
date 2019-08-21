// const URL = "http://192.168.1.234:8080";
const URL = "http://localhost:8080";

//this will reset the form just in case the form doesnt reset on its own
document.getElementById("register").reset();

function ValidateFormNew() {
    var firstName = document.getElementById("fName").value.toLowerCase();
    var Num = document.getElementById("num").value.split(/[(\)\-\" "]/).join("");

    if (Num == "") {
        Num = "0";
    }

    if (firstName != "") {
        if (Num != "" && isNaN(Num)) {
            document.getElementById("errorAlert").style.display = "block";
            setTimeout(disappearAlert, 3000);
        } else {
            registerToServer(Num, firstName);
        }
        return false;
    }
    else {
        document.getElementById("errorAlert").style.display = "block";
        setTimeout(disappearAlert, 3000);
        return false;
    }
}

function disappearAlert() {
    document.getElementById("errorAlert").style.display = "none";
}

function disappearModal() {
    location.assign("FormMain.html");
}

function registerToServer(Num, firstName) {
    var url = `${URL}/addNewEntry`;
    var request = new XMLHttpRequest();
    
    request.onload = function () {
        var response = JSON.parse(request.responseText);
        var position = response.position;
        document.getElementById("yourName").innerHTML = firstName;
        document.getElementById("currentposition").innerHTML = position;
        if (response.result == "0") {
            alert("Error: The ID is already in use, please try again");
        } else if (response.result == "1") {
            $("#successModal").modal({ backdrop: "static" });
            setTimeout(disappearModal, 12000);
        } else if (response.result == "-1"){
            alert("Error: Invalid phone number");
        }
    };

    request.onerror = function () {
        alert("Error: Please try again");
    };

    request.open("POST", url, true);
    request.send("phoneNum=" + Num + "&firstName=" + firstName);
}

// ** OLD AND NOT IN USE ANYMORE ** //
function ValidateFormOld() {
    var uniqueID = document.getElementById("uniqueID").value.replace(/\s/g, "");
    var Num = document.getElementById("num").value.split(/[(\)\-\" "]/).join("");

    if (Num == "") {
        Num = "0";
    }

    if (uniqueID != "") {
        if (Num != "" && isNaN(Num)) {
            document.getElementById("errorAlert").style.display = "block";
            setTimeout(disappearAlert, 3000);
        } else {
            registerToServerAgain(uniqueID, Num);
        }
        return false;
    }
    else {
        document.getElementById("errorAlert").style.display = "block";
        setTimeout(disappearAlert, 3000);
        return false;
    }
}

function registerToServerAgain(uniqueID, Num) {
    var url = `${URL}/reRegister`;
    var request = new XMLHttpRequest();

    request.onload = function () {
        var response = JSON.parse(request.responseText);
        var position = response.position;
        document.getElementById("currentposition").innerHTML = position;
        if (response.result == "0") {
            alert("Error: The ID entered is not in our database, please try again or register with a new ID");
        } else if (response.result == "1") {
            $("#successModal").modal({ backdrop: "static" });
            setTimeout(disappearModal, 5000);
        } else if (response.result == "-1"){
            alert("Error: Invalid phone number");
        }
    };

    request.onerror = function () {
        alert("Error: Please try again");
    };

    request.open("POST", url, true);
    request.send("uniqueID=" + uniqueID + "&phoneNum=" + Num);
}

