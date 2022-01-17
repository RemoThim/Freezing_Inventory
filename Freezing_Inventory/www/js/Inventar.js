function showData() {
    var ref = firebase.database().ref();
    ref.on("value", function (response) {
        // console.log(response.val());
        // Template in eine Variable speichern
        var template = $('#template').html();
        // Template mit Mustache verbinden
        var html = Mustache.render(template, response.val());
        // Ausgabe anzeigen 
        $('#tabelle tbody').html(html);
        $('.anzeigen').click(function (e) {
            e.preventDefault();
            var i = $(this).attr('data-id') - 1;

            var latitude = firebase.database().ref('Fahrzeuge/' + i + '/latitude');
            var longitude = firebase.database().ref('Fahrzeuge/' + i + '/longitude');
            latitude.on("value", function (snapshot) {
                latitude = snapshot.val();

            })
            longitude.on("value", function (snapshot) {
                longitude = snapshot.val();

            })
            if (marker != null) {
                mymap.removeLayer(marker);
            }
            mymap.setView([latitude, longitude], 15);
            marker = L.marker([latitude, longitude]);
            mymap.addLayer(marker);
        });


    }, function (error) {
        console.log("Error: " + error.message);
    });
}
var marker;
var onSuccess = function (position) {
    //console.log();
    $(window).height()
    if (marker != null) {
        mymap.removeLayer(marker);
    }
    mymap.setView([position.coords.latitude, position.coords.longitude], 17);
    marker = L.marker([position.coords.latitude, position.coords.longitude]);
    mymap.addLayer(marker);
    /* alert('Latitude: ' + position.coords.latitude + '\n' +
        'Longitude: ' + position.coords.longitude + '\n' +
        'Altitude: ' + position.coords.altitude + '\n' +
        'Accuracy: ' + position.coords.accuracy + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
        'Heading: ' + position.coords.heading + '\n' +
        'Speed: ' + position.coords.speed + '\n' +
        'Timestamp: ' + position.timestamp + '\n'); */
};
showData();

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
$('#hinzu').click(function (e) {
    $('main').load('Hinzufuegen.html', function () {
        $.getScript('js/Hinzufuegen.js')

    });
});