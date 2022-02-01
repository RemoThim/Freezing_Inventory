var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
db.transaction(populateDB);
db.transaction(insertDB, errorCB, successCB);
var select = 'SELECT ArtName,ArtAnz,ArtAblaufdatum FROM TArtikel'
db.transaction(dropdown, errorCB)


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
        //var tmpArgs = results.rows.item(i).ArtName + ",'" + results.rows.item(i).ProAnz + "','" + results.rows.item(i).ProAblaufdatum + "'";
        tblText += '<tr><td>' + results.rows.item(i).ArtName + '</td><td>' + results.rows.item(i).ArtAnz + '</td><td>' + results.rows.item(i).ArtAblaufdatum + '</td></tr>';
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
    //tx.executeSql('INSERT INTO TKategorie (KatId,KatName) VALUES (1,"Fleisch"),(2,"Obst")');
    // tx.executeSql('INSERT INTO TArtikel (KatID,ArtName,ArtAnz,ArtAblaufdatum) VALUES (1,"Iglo Fischstäbchen",2,"2022-03-15"),(2,"Apfel",2,"2022-10-16")');
}

function dropdown(tx) {
    tx.executeSql('Select * from TKategorie', [], filldropdown, errorCB);
}
function filldropdown(tx, results) {
    var dropHtml = '<select onchange="KatWahl(this)"><option value=0>Alle</option>'
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        dropHtml += "<option value=" + results.rows.item(i).KatId + ">" + results.rows.item(i).KatName + "</option>";
    }
    dropHtml += '</select>'
    document.getElementById("dropdown").innerHTML = dropHtml;
}
function KatWahl(selectObject, tx) {
    var Auswahl = selectObject.value;
    console.log(Auswahl);
    if (Auswahl == 0) {
        select = 'SELECT ArtName,ArtAnz,ArtAblaufdatum FROM TArtikel';
    } else {
        select = "SELECT ArtName,ArtAnz,ArtAblaufdatum FROM TArtikel where KatId = " + Auswahl
    }
    console.log(select);
    db.transaction(execute, errorCB)
}
function KatAnzeige(tx) {
    tx.executeSql(select, [], querySuccess, errorCB);
}