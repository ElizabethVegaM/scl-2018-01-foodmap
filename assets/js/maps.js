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
      for (var i = 0; i < results.length; i++) {
        createModal(results[i]);
      }
    }
  });
};


function createModal(place) {
  console.log(place.name);
}

/*
// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  let input = document.getElementById('searchInput');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log('Returned place contains no geometry');
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
} */