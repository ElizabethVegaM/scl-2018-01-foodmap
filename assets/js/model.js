let map;
let infowindow = new google.maps.InfoWindow();

function initMap() {
  navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    const myLatlng = new google.maps.LatLng(latitude, longitude);

    const mapOptions = {
      center: myLatlng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.MAP
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // Para hacer la búsqueda de acuerdo a la ubicación y tipo de local
    const request = {
      location: myLatlng,
      radius: 5000,
      types: ['restaurant', 'cafe', 'bar']
    };
    // Petición de búsqueda de los lugares con los parámetros ya indicados
    const service = new google.maps.places.PlacesService(map);
    placeInfoWindows(service, request);
  });
};

function search() {
  let input = document.getElementById('searchInput').value;
  navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  });
  const myLatlng = new google.maps.LatLng(latitude, longitude);
  const mapOptions = {
    center: myLatlng,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.MAP
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  let service = new google.maps.places.PlacesService(map);

  // Búsqueda de lugares
  service.textSearch({
    location: myLatlng,
    radius: 1000,
    query: input
  }, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      infoContainer.innerHTML = '';
      for (var i = 0; i <= results.length; i++) {
        createModal(results[i]);
      }
      input = '';
    }
  });
};