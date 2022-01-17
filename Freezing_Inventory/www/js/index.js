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
$(function(){
    var firebaseConfig = {
        apiKey: "AIzaSyDia5VTzfuGXexiFvMMZhLgjaJxjZxKpU0",
        authDomain: "freezing-inventory.firebaseapp.com",
        databaseURL: "https://freezing-inventory-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "freezing-inventory",
        storageBucket: "freezing-inventory.appspot.com",
        messagingSenderId: "232841458854",
        appId: "1:232841458854:web:3565282d9b374866d0b067",
        measurementId: "G-4F7YKZW7S3"
      };
    firebase.initializeApp(firebaseConfig);
    firebase.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    $('#s1').click(function(e){
        $('main').load('Inventar.html', function(){
            $.getScript('js/Inventar.js')
            
        });
    });
    $('#s2').click(function(e){
        $('main').load('Benutzung.html', function(){
            $.getScript('js/Benutzung.js')
            
        });
    });
    $('#s3').click(function(e){
        $('main').load('Verwalten.html', function(){
            $.getScript('js/Verwalten.js')
            
        });
    });
})
function onDeviceReady() {
    $('main').load('Inventar.html', function(){
        $.getScript('js/Inventar.js')
    });
}