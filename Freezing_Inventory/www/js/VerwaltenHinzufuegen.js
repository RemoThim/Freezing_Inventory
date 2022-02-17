var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
db.transaction(queryDB, errorCB);

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
function submit() {
    console.log(document.getElementById("HinzName").value);
    if (document.getElementById("HinzName").value != null) {
        if (document.getElementById("HinzAnz").value != null) {
            if (document.getElementById("HinzDatum").value != null) {
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
}
function hinzufuegen(tx) {
    tx.executeSql("INSERT INTO TArtikel  (KatID,ArtName,ArtAnz,ArtAblaufdatum) VALUES (1,'" + document.getElementById("HinzName").value + "','" + document.getElementById("HinzAnz").value + "','" + document.getElementById("HinzDatum").value + "')", [], queryDB, errorCB);
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