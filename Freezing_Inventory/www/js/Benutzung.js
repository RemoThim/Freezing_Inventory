var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
db.transaction(Benutzung, errorCB);
db.transaction(queryDB, errorCB);
var row;

function Benutzung(tx) {
    tx.executeSql("SELECT ArtName,ArtId,strftime('%d.%m.%Y',ArtAblaufdatum) as ptime FROM TArtikel", [], fillBenutzung, errorCB);
}
function fillBenutzung(tx, results) {
    var VerHtml = '<label><b>Artikel:</b></label><br><select id="select" class="form-select">'
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        VerHtml += "<option value=" + results.rows.item(i).ArtId + ">" + results.rows.item(i).ArtName + " vom " + results.rows.item(i).ptime + "</option>";
    }
    VerHtml += '</select><br><label><b>Anzahl:</b></label><br><input type="number" id="Anzahl" class="form-control w-25" min="1"><button id="VerbButton" class="btn btn-light" onclick="Verbauch()">Verbrauchen</button>'
    document.getElementById("verbrauch").innerHTML = VerHtml;
}
function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}
function queryDB(tx) {
    tx.executeSql("SELECT ArtName,ArtAnz,ArtId,strftime('%d.%m.%Y',ArtAblaufdatum) as ptime FROM TArtikel ", [], querySuccess, errorCB);
}
function querySuccess(tx, results) {
    var tblText = '<table class="table table-striped table-bordered" id="info"><thead><tr><th>Name</th> <th>Anzahl</th> <th>Ablaufdatum</th></tr></thead><tbody>';
    var len = results.rows.length;
    if (len >= 1) {
        for (var i = 0; i < len; i++) {
            if (results.rows.item(i).ArtAnz < 1) {
                deleteRow(results.rows.item(i).ArtId);
            } else {
                tblText += '<tr><td>' + results.rows.item(i).ArtName + '</td><td>' + results.rows.item(i).ArtAnz + '</td><td>' + results.rows.item(i).ptime + '</td></tr>';
            }
        }
        tblText += "</tbody></table>";
        document.getElementById("table").innerHTML = tblText;
    }
}
function Verbauch() {
    var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
    var wert = document.getElementById("Anzahl");
    if (wert.value < 1) {
        alert("Die Anzahl muss grössergleich 1 sein!")
    } else {
        db.transaction(VerbrauchSQL, errorCB);
    }
}
function VerbrauchSQL(tx) {
    var auswahl = document.getElementById("select");
    var wert = document.getElementById("Anzahl")
    tx.executeSql("UPDATE TArtikel set ArtAnz = ArtAnz - " + wert.value + " where ArtId = " + auswahl.value, [], queryDB, errorCB);
}
function deleteRow(ID) {
    row = ID;
    var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
    
    db.transaction(lol, errorCB);
}
function lol(tx) {
    tx.executeSql('DELETE FROM TArtikel WHERE ArtId = ' + row, [], queryDB, errorCB)
    db.transaction(Benutzung, errorCB); 
}