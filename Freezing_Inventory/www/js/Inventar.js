var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
db.transaction(populateDB, errorCB);
var select = "SELECT ArtName,ArtAnz,strftime('%d.%m.%Y',ArtAblaufdatum) as ptime FROM TArtikel";
db.transaction( queryDB, errorCB ,successCB);
db.transaction(dropdown, errorCB);


function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS TKategorie (KatId INTEGER PRIMARY KEY AUTOINCREMENT, KatName)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS TArtikel (ArtId INTEGER PRIMARY KEY AUTOINCREMENT,KatId, ArtName,ArtAnz,ArtAblaufdatum)');
}
function queryDB(tx) {
    tx.executeSql(select, [], querySuccess, errorCB);
}
function querySuccess(tx, results) {
    var tblText = '<table class="table table-striped table-bordered"><thead><tr><th>Name</th> <th>Anzahl</th> <th>Ablaufdatum</th></tr></thead><tbody>';
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        tblText += '<tr><td>' + results.rows.item(i).ArtName + '</td><td>' + results.rows.item(i).ArtAnz + '</td><td>' + results.rows.item(i).ptime + '</td></tr>';
    }
    tblText += "</tbody></table>";
    document.getElementById("table").innerHTML = tblText;
}
function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}

// Transaction success callback
//
function successCB() {
    var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
    db.transaction(queryDB, errorCB);
}
function insertDB(tx) {
   tx.executeSql('INSERT INTO TKategorie (KatId,KatName) VALUES (1,"Fisch"),(2,"Obst")');
   tx.executeSql('INSERT INTO TArtikel (KatID,ArtName,ArtAnz,ArtAblaufdatum) VALUES (1,"Iglo Fischstäbchen",2,"2022-10-15"),(2,"Apfel",2,"2022-10-16")');
}

function dropdown(tx) {
    tx.executeSql('Select * from TKategorie', [], filldropdown, errorCB);
}
function filldropdown(tx, results) {
    var dropHtml = '<label><b>Kategorie:</b></label><br><select onchange="KatWahl(this)" class="form-select w-50"><option value=0>Alle</option>'
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        dropHtml += "<option value=" + results.rows.item(i).KatId + ">" + results.rows.item(i).KatName + "</option>";
    }
    dropHtml += '</select><button id="Warnungen" class="btn" onclick="ablaufcheck()">Warnungen</button>'
    document.getElementById("dropdown").innerHTML = dropHtml;
}
function KatWahl(selectObject, tx) {
    var Auswahl = selectObject.value;
    if (Auswahl == 0) {
        select = "SELECT ArtName,ArtAnz,strftime('%d.%m.%Y',ArtAblaufdatum) as ptime FROM TArtikel";
    } else {
        select = "SELECT ArtName,ArtAnz,strftime('%d.%m.%Y',ArtAblaufdatum) as ptime FROM TArtikel where KatId = " + Auswahl
    }
    db.transaction(KatAnzeige, errorCB)
}
function KatAnzeige(tx) {
    tx.executeSql(select, [], querySuccess, errorCB);
}
function ablaufcheck(){
    db.transaction(checkAblaufdatum, errorCB);
}
function checkAblaufdatum(tx) {
    tx.executeSql("SELECT ArtName,ArtId,ArtAblaufdatum,strftime('%d.%m.%Y',ArtAblaufdatum) as ptime FROM TArtikel", [], alertablauf, errorCB);
}
function alertablauf(tx, results) {
    var len = results.rows.length;
    var d1 = new Date();
    var d2;
    var alarmtext = "Folgende Produkte könnten abgelaufen sein:\n";
    var abgelaufen = false;
    for (var i = 0; i < len; i++) {
        d2 = new Date(results.rows.item(i).ArtAblaufdatum)
        if (d1 >= d2) {
            abgelaufen = true;
            alarmtext +=  results.rows.item(i).ArtName +" vom " + results.rows.item(i).ptime + "\n"
        }
    }
    if (abgelaufen == true){
        alert(alarmtext);
    }
}
function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}