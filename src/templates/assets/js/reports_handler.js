



function closetable() { 
    document.getElementById("tabletemplate").style.display = "none";
};

document.getElementById("tabletemplate").style.display = "none";

//document.getElementById("tabletemplate").style.visibility = "hidden";
//document.getElementById(id).style.visibility = "visible";


function show_rawdata_table() {
    var table = document.querySelector('#tabletemplate');  
    table.style.display = "inline"; 
  //  table.style.zIndex = "-1"; 
    table.querySelector('.card-title').innerHTML = "Исходные данные";   
    table = table.querySelector('#bootstrap-data-table-export');  
    //var mysql = require('mysql'); 
    var header = table.createTHead();
    var row = header.insertRow(0);
    row.insertCell(0).innerHTML = "<b> ID машины</b>"; 
    row.insertCell(1).innerHTML = "<b> Дата приезда</b>"; 
    row.insertCell(2).innerHTML = "<b>Статус</b>";
    row.insertCell(3).innerHTML = "<b>Очередь на заказ</b>";
    row.insertCell(4).innerHTML = "<b>Время заказа</b>";
    row.insertCell(5).innerHTML = "<b>Очередь на оплату</b>";
    row.insertCell(6).innerHTML = "<b>Время на оплате</b>";
    row.insertCell(7).innerHTML = "<b>Очередь на выдачу</b>";
    row.insertCell(8).innerHTML = "<b>Время на выдаче</b>";
    row.insertCell(9).innerHTML = "<b>Итого</b>";
 
    var today = new Date(); 
    var date = today.getDate() + '/' + (+today.getMonth()+1) + '/' + today.getFullYear()  ;
    
    for (var i=0; i< 50; i++) {
        row = table.insertRow(-1); 
        row.insertCell(0).innerHTML = "car"+i; 
        if (i < 10) { 
            row.insertCell(-1).innerHTML = date + " 12:00:0"+i; 
        } else  row.insertCell(-1).innerHTML = date + " 12:00:"+i; 
        row.insertCell(-1).innerHTML = "Ок";  
        for (var j=3; j< 10; j++) { 
            row.insertCell(-1).innerHTML = " 01:0"+j;  
        }  
    }
    
    /*
    var con = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user: "root",
    password: "2Zk9#d1UGvF@" 
    //database: "store_db"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!"); 
        con.query("CREATE DATABASE IF NOT EXISTS store_db", function (err, result) {
        if (err) throw err;
        console.log("Database created");
        });
        con.query("USE store_db;", function (err, result) {
            if (err) throw err;
            console.log("Using store_db");
        });
        sql = "CREATE TABLE if not exists RawCarData (departure_time VARCHAR(50), event VARCHAR(50),";
        sql += " lane INT, cars_in_queue INT, lane_total VARCHAR(50), menu_board VARCHAR(50), menu_board_queue VARCHAR(50),";
        sql += " cash_board VARCHAR(50), cash_board_queue VARCHAR(50), service_board VARCHAR(50), service_board_queue VARCHAR(50));";
        con.query(sql, function (err, result) {
            if (err) throw err;
        }
    }*/

    //departure_time, event, lane, cars_in_queue, lane_total, menu_board, menu_board_queue, cash_board, cash_board_queue, service_board, service_board_queue)";
}
  

window.addEventListener('load', (event) => { 
    var btns = document.querySelector('#reportsummary-button'); 
    btns.onclick = show_rawdata_table; 
});

var specialElementHandlers = {
    // element with id of "bypass" - jQuery style selector
    '.no-export': function (element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true;
    }
};


function exportPDF(table_id) {
    var doc = new jsPDF('p', 'pt', 'a4');
    //A4 - 595x842 pts
    //https://www.gnu.org/software/gv/manual/html_node/Paper-Keywords-and-paper-size-in-points.html 
    //Html source 
    var source = document.getElementById(table_id);
console.log(source);
    var margins = {
        top: 10,
        bottom: 10,
        left: 10,
        width: 595
    };

    doc.fromHTML(
        source, // HTML string or DOM elem ref.
        margins.left,
        margins.top, {
            'width': margins.width,
            'elementHandlers': specialElementHandlers
        },

        function (dispose) {
            // dispose: object with X, Y of the last line add to the PDF 
            //          this allow the insertion of new lines after html
            doc.save('Test.pdf');
        }, margins);
}
 
function exportCSV(table_id, separator = ',') {
    // Select rows from table_id
    var rows = document.querySelectorAll('table#' + table_id + ' tr');
    // Construct csv
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
        for (var j = 0; j < cols.length; j++) {
            // Clean innertext to remove multiple spaces and jumpline (break csv)
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
            data = data.replace(/"/g, '""');
            // Push escaped string
            row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
    }
    var csv_string = csv.join('\n');
    // Download it
    var filename = 'export_' + table_id + '_' + new Date().toLocaleDateString() + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
 