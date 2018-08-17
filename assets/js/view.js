// Fadeout de la página principal
const preload = document.getElementById('first');
setTimeout(() => {
  preload.style.animation = 'fadeout 2s ease';
  preload.style.display = 'none';
  main.style.animation = 'fadein 2s ease';
}, 4000);

// Manejo del botón del input de búsqueda
let inputTxt = document.getElementById('searchInput');
searchBtn.disabled = true;
inputTxt.addEventListener('keyup', function() {
  if (inputTxt.length === 0) { 
    searchBtn.disabled = true; 
  } else {
    searchBtn.disabled = false;
  }
});

function createMarker(place) {
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    // Para mostrar nombre y dirección de los lugares
    infowindow.setContent('<div><strong>' + place.name + '</strong></div>');
    infowindow.open(map, this);
  });
}

infoContainer = document.getElementById('results');

function createModal(place) {
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    // Para mostrar nombre y dirección de los lugares
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.formatted_address + '</div>');
    infowindow.open(map, this);
  });
  if (place.opening_hours) {
    if (place.opening_hours.open_now === true) {
      infoContainer.innerHTML += '<div class="restaurantContainer"><button type="button" class="btn restaurant-btn" data-toggle="modal" data-target="#a' + place.id + '"><i class="fas fa-utensils"></i>' + place.name + '</button><div id="a' + place.id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">    <div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLongTitle">' + place.name + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><p>Dirección: ' + place.formatted_address + '</p><p>Estado: Abierto</p><p>Calificación: ' + place.rating + ' <i class="fas fa-star"></i></p></div></div></div></div></div>';
    } else {
      infoContainer.innerHTML += '<div class="restaurantContainer"><button type="button" class="btn restaurant-btn" data-toggle="modal" data-target="#a' + place.id + '"><i class="fas fa-utensils"></i>' + place.name + '</button><div id="a' + place.id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">    <div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLongTitle">' + place.name + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><p>Dirección: ' + place.formatted_address + '</p><p>Estado: Cerrado</p><p>Calificación: ' + place.rating + ' <i class="fas fa-star"></i></p></div></div></div></div></div>';
    }
  } else {
    infoContainer.innerHTML += '<div class="restaurantContainer"><button type="button" class="btn restaurant-btn" data-toggle="modal" data-target="#a' + place.id + '"><i class="fas fa-utensils"></i>' + place.name + '</button><div id="a' + place.id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">    <div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLongTitle">' + place.name + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><p>Dirección: ' + place.formatted_address + '</p><p>Estado: Sin información</p><p>Calificación: ' + place.rating + ' <i class="fas fa-star"></i></p></div></div></div></div></div>';
  }
}