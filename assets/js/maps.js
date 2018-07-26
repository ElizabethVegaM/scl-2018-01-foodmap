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
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.MAP
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    infowindow = new google.maps.InfoWindow();

    // Para hacer la búsqueda de acuerdo a la ubicación y tipo de local
    const request = {
      location: myLatlng,
      radius: 5000,
      types: ['restaurant', 'cafe', 'bar']
    };

    let input = document.getElementById('searchInput');
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

infoContainer = document.getElementById('results');
// Búsqueda de locales
function search() {
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
  let input = document.getElementById('searchInput').value;
  infowindow = new google.maps.InfoWindow();
  let service = new google.maps.places.PlacesService(map);
  service.textSearch({
    location: myLatlng,
    radius: 1000,
    query: input
  }, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      infoContainer.innerHTML = '';
      for (var i = 0; i < results.length; i++) {
        createModal(results[i]);
      }
      input = '';
    }
  });
};

// Crea marcadores dentro del mapa
function createMarker(place) {
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    // Para mostrar nombre y dirección de los lugares
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.vicinity + '</div>');
    infowindow.open(map, this);
  });
}

function createModal(place) {
  console.log(place);
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    // Para mostrar nombre y dirección de los lugares
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.formatted_address + '</div>');
    infowindow.open(map, this);
  });
  infoContainer.innerHTML += '<div class="restaurantContainer"><h6>' + place.name + '</h6><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#a' + place.id + '"><i class="fas fa-utensils"></i></button><div id="a' + place.id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">    <div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLongTitle">'+ place.name +'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><p>' + place.formatted_address + '</p><p>' + place.photos['0'].html_attributions['0'] + '</p><p>Rating: ' + place.rating + '</p></div></div></div></div></div>';
}


/*
'<div class="restaurantContainer"><h6><strong>' + place.name + '</strong></h6><button type="button" class="btn btn-primary" data-toggle="modal" data-target=".' + place.name + '"><i class="fas fa-utensils"></i></button><div class="modal fade bd-example-modal-sm ' + place.name + '" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content"><p>' + place.formatted_address + '</p><p>' + place.photos['0'].html_attributions['0'] + '</p><p>Rating: ' + place.rating + '</p></div></div></div>'
 */