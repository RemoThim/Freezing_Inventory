var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
db.transaction(queryDB, errorCB);
db.transaction(dropdown, errorCB);
document.getElementById("newKat").style.display = "none";
document.getElementById("Hinzufuegen").style.display = "block";
var row;
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
        document.getElementById("hinztable").innerHTML = tblText;
    }
}
function changeHtml() {
    if (document.getElementById("select").value == -1) {
        document.getElementById("Hinzufuegen").style.display = "none";
        document.getElementById("newKat").style.display = "block";
    } else {
        document.getElementById("newKat").style.display = "none";
        document.getElementById("Hinzufuegen").style.display = "block";
    }
}
function submit() {
    if (document.getElementById("select").value >= 1) {
        if (document.getElementById("HinzName").value != "") {
            if (document.getElementById("HinzAnz").value != "") {
                if (document.getElementById("HinzDatum").value != "") {
                    var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
                    db.transaction(hinzufuegen, errorCB);
                } else {
                    alert("Bitte geben sie ein Datum ein!");
                }
            } else {
                alert("Bitte geben sie einen Anzahl ein!");
            }
        } else {
            alert("Bitte geben sie einen Namen ein!");
        }
    } else {
        alert("Bitte wählen sie eine Kategorie!");
    }
}
function hinzufuegen(tx) {
    tx.executeSql("INSERT INTO TArtikel  (KatID,ArtName,ArtAnz,ArtAblaufdatum) VALUES (" + document.getElementById("select").value + ",'" + document.getElementById("HinzName").value + "','" + document.getElementById("HinzAnz").value + "','" + document.getElementById("HinzDatum").value + "')", [], queryDB, errorCB);
    document.getElementById("select").value = 0;
    document.getElementById("HinzName").value = "";
    document.getElementById("HinzAnz").value = "";
    document.getElementById("HinzDatum").value = "";
    alert("Artikel Hinzugefügt!");
}
function NewKat() {
    if (document.getElementById("neueKat").value != "") {
        var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
        db.transaction(newKatSQL, errorCB);
    } else {
        alert("Bitte Name für neue Kategorie eingeben!")
    }

}
function newKatSQL(tx) {
    tx.executeSql('INSERT INTO TKategorie (KatName) VALUES ("'+document.getElementById("neueKat").value+'")',[],dropdown, errorCB)
}
function deleteRow(ID) {
    row = ID;
    var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
    db.transaction(deleteSelect, errorCB);
}
function deleteSelect(tx) {
    tx.executeSql('DELETE FROM TArtikel WHERE ArtId = ' + row, [], queryDB, errorCB)
}
function dropdown(tx) {
    tx.executeSql('Select * from TKategorie', [], filldropdown, errorCB);
}
function filldropdown(tx, results) {
    var dropHtml = '<label><b>Kategorie:</b></label><br><select onchange="changeHtml()" class="form-select w-50" id="select"><option>alle</option><option value=-1>Neue Kategorie</option>'
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        dropHtml += "<option value=" + results.rows.item(i).KatId + ">" + results.rows.item(i).KatName + "</option>";
    }
    dropHtml += '</select>'
    document.getElementById("dropdown").innerHTML = dropHtml;
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