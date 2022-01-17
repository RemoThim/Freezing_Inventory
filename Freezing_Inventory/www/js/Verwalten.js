$('#submit').click(function (e) { 
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(LatLang, onError);
});
showData();
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

    }, function (error) {
        console.log("Error: " + error.message);
    });
}
var LatLang = function(LngLat){
    var ref = firebase.database().ref();
    ref.once("value", function (snapshot) {
        var json_elemente = snapshot.val().Fahrzeuge;
        var keys = Object.keys(json_elemente);
        var count = Math.max.apply(null, keys) + 1;
 
    firebase.database().ref("Fahrzeuge/" + count).set({
            id: parseInt(count) + 1,
            FahrzeugName: $('#name').val(),
            latitude: LngLat.coords.latitude,
            longitude: LngLat.coords.longitude
    });

});
}
