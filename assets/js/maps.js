window.onload = () => {
  initMap();
};

let map;
let infowindow;

// Iniciar el mapa con la localización del dispositivo
function initMap() {
  navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    const myLatlng = new google.maps.LatLng(latitude, longitude);

    const mapOptions = {
      center: myLatlng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.MAP
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    infowindow = new google.maps.InfoWindow();

    // Para hacer la búsqueda de acuerdo a la ubicación y tipo de local
    const request = {
      location: myLatlng,
      radius: 5000,
      type: ['restaurant']
    };

    // Petición de búsqueda de los lugares con los parámetros ya indicados
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    });
  });
}

// Crea marcadores dentro del mapa
function createMarker(place) {
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    // Para mostrar nombre y dirección de los lugares
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
      '<br>' + place.vicinity + '</div>');
    infowindow.open(map, this);
  });
}