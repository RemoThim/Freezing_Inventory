/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
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
})
function onDeviceReady() {
    $('main').load('Inventar.html', function () {
        $.getScript('js/Inventar.js')
    });
    var db = window.openDatabase("Inventory", "1.0", "Inventory", 200000);
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