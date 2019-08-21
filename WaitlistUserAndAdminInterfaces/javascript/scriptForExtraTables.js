// const URL = "http://192.168.1.234:8080";
const URL = "http://localhost:8080";

function UpdateLogs() {
    var url = `${URL}/getLogs`;
    var request = new XMLHttpRequest();

    request.onload = function () {
        var response = JSON.parse(request.responseText);
        $('#logTable').DataTable({
            data: response,
            "order": [[1, 'asc']]
        });
    };

    request.onerror = function () {
        alert("Error: refresh the page");
    };

    request.open("POST", url, true);
    request.send();
}

function UpdateNoShow() {
    var url = `${URL}/getNoShow`;
    var request = new XMLHttpRequest();

    request.onload = function () {
        var response = JSON.parse(request.responseText);
        $('#noShowTable').DataTable({
            data: response
        });
    };

    request.onerror = function () {
        alert("Error: refresh the page");
    };

    request.open("POST", url, true);
    request.send();
}