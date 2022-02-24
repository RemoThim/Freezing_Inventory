var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
db.transaction(select, errorCB);
db.transaction(queryDB, errorCB);
db.transaction(Bearbeiten, errorCB);
var row;

function select(tx) {
    tx.executeSql("SELECT ArtName,ArtId,strftime('%d.%m.%Y',ArtAblaufdatum) as ptime FROM TArtikel", [], fillselect, errorCB);
}
function fillselect(tx, results) {
    var VerHtml = '<label><b>Artikel:</b></label><br><select onchange="Bearbeiten()" id="select" class="form-select">'
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        VerHtml += "<option value=" + results.rows.item(i).ArtId + ">" + results.rows.item(i).ArtName + " vom " + results.rows.item(i).ptime + "</option>";
    }
    document.getElementById("dropdown").innerHTML = VerHtml;
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
function BearbeitenSQL(tx) {
    var auswahl = document.getElementById("select");
    var wert = document.getElementById("Anzahl")
    tx.executeSql("UPDATE TArtikel set ArtAnz = ArtAnz - " + wert.value + " where ArtId = " + auswahl.value, [], queryDB, errorCB);
}
function deleteRow(ID) {
    row = ID;
    var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
    db.transaction(deleteSelect, errorCB);
}
function deleteSelect(tx) {
    tx.executeSql('DELETE FROM TArtikel WHERE ArtId = ' + row, [], queryDB, errorCB)
    db.transaction(Benutzung, errorCB);
}
function Bearbeiten() {
    var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
    db.transaction(FillBearbeiten, errorCB);
}
function FillBearbeiten(tx) {
    var selected = document.getElementById("select");
    tx.executeSql('select * from TArtikel WHERE ArtId = ' + selected.value, [], queryBearbeiten, errorCB)
}
function queryBearbeiten(tx, results) {
    var BearbeitenHTML = '<label>Name:</label><input type="text" id="BearName" class="form-control" value="' + results.rows.item(0).ArtName + '"><br>'
    BearbeitenHTML += '<label>Anzahl:</label><input type="number" id="BearAnzahl" class="form-control" value="' + results.rows.item(0).ArtAnz + '"><br>'
    BearbeitenHTML += '<label>Ablaufdatum:</label><input type="date" id="BearDatum" value="' + results.rows.item(0).ArtAblaufdatum + '"><br>'
    BearbeitenHTML += '<button id="VerbButton" class="btn btn-light" onclick="submit()">Speichern</button>'
    document.getElementById("Bearbeiten").innerHTML = BearbeitenHTML;
}
function submit() {
    var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
    db.transaction(updateTable, errorCB);
    db.transaction(select, errorCB);
}
function updateTable(tx) {
    tx.executeSql("UPDATE TArtikel set ArtName =  '" + document.getElementById("BearName").value + "', ArtAnz = '" + document.getElementById("BearAnzahl").value + "', ArtAblaufdatum = '" + document.getElementById("BearDatum").value + "' where ArtId = " + document.getElementById("select").value, [], queryDB, errorCB)
}

$(function () {
    $('#s1').click(function (e) {
        $('main').load('Inventar.html', function () {
            $.getScript('js/Inventar.js')

        });
    });
    $('#s2').click(function (e) {
        $('main').load('Benutzung.html', function () {
            $.getScript('js/Benutzung.js')

        });
    });
    $('#s3').click(function (e) {
        $('main').load('VerwaltenHinzufuegen.html', function () {
            $.getScript('js/VerwaltenHinzufuegen.js')

        });
    });
    $('#s4').click(function (e) {
        $('main').load('VerwaltenHinzufuegen.html', function () {
            $.getScript('js/VerwaltenHinzufuegen.js')

        });
    });
    $('#s5').click(function (e) {
        $('main').load('VerwaltenBearbeiten.html', function () {
            $.getScript('js/VerwaltenBearbeiten.js')

        });
    });
    $('#s6').click(function (e) {
        $('main').load('VerwaltenLoeschen.html', function () {
            $.getScript('js/VerwaltenLoeschen.js')

        });
    });
})
