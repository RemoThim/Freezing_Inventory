var marker;
var onSuccess = function (position) {
    $(window).height()
    if (marker != null) {
        mymap.removeLayer(marker);
    }
    mymap.setView([position.coords.latitude, position.coords.longitude], 17);
    marker = L.marker([position.coords.latitude, position.coords.longitude]);
    mymap.addLayer(marker);
};
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
var setLngLat = function(LngLat){
    var FahrName = firebase.database().ref("Fahrzeuge/" + id_aenderne + "/FahrzeugName");
    var id = firebase.database().ref("Fahrzeuge/" + id_aenderne + "/id");
    
    FahrName.on("value", function(snapshot) {
         FahrName = snapshot.val();

    })
    id.on("value", function(snapshot) {
        id = snapshot.val();

   })
    firebase.database().ref("Fahrzeuge/" + id_aenderne).set({
        FahrzeugName : FahrName,
        id: id,
        latitude: LngLat.coords.latitude,
        longitude: LngLat.coords.longitude
    });
} 
var id_aenderne;
navigator.geolocation.getCurrentPosition(onSuccess, onError);
showData();
function showData() {
    var ref = firebase.database().ref();
    ref.on("value", function (response) {
        var template = $('#template').html();
        var html = Mustache.render(template, response.val());
        $('#tabelle tbody').html(html);
        $(".parken").click(function (e) { 
            e.preventDefault();
             id_aenderne = $(this).attr('data-id') - 1;
             navigator.geolocation.getCurrentPosition(setLngLat, onError);

        });
    }, function (error) {
        console.log("Error: " + error.message);
    });
}