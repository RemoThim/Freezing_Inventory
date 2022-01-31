var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
    db.transaction(populateDB);
    db.transaction(insertDB, errorCB, successCB);

function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS TKategorie (KatID INTEGER PRIMARY KEY AUTOINCREMENT, Katname)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS TArtikel (ArtID INTEGER PRIMARY KEY AUTOINCREMENT,KatID, ArtName,ArtAnz,ArtAblaufdatum)');
}
function queryDB(tx) {
    tx.executeSql('SELECT ArtName,ArtAnz,ArtAblaufdatum FROM TArtikel', [], querySuccess, errorCB);
}
function querySuccess(tx, results) {
    var tblText = '<table id="t01" class="table table-striped"><tr><th>Name</th> <th>Anzahl</th> <th>Ablaufdatum</th></tr>';
    var len = results.rows.length;
    console.log(len);
    for (var i = 0; i < len; i++) {
        //var tmpArgs = results.rows.item(i).ArtName + ",'" + results.rows.item(i).ProAnz + "','" + results.rows.item(i).ProAblaufdatum + "'";
        tblText += '<tr><td>' + results.rows.item(i).ArtName + '</td><td>' + results.rows.item(i).ArtAnz + '</td><td>' + results.rows.item(i).ArtAblaufdatum + '</td></tr>';
    }
    tblText += "</table>";
    document.getElementById("tabelle").innerHTML = tblText;
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
   // tx.executeSql('INSERT INTO TArtikel (KatID,ArtName,ArtAnz,ArtAblaufdatum) VALUES (1,"Iglo Fischstäbchen",2,"2022-03-15"),(2,"Apfel",2,"2022-10-16")');
}