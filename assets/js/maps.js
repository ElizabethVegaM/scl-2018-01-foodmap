function findMe() {
  let output = document.getElementById('map');
  if (navigator.geolocation) {
    output.innerHTML = 'Tu navegador soporta geolocalización';
  } else {
    output.innerHTML = 'Tu navegador no soporta geolocalización';
  }

  function localization(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    output.innerHTML = `Latitud es ${latitude} y Longitud es ${longitude}`;
  }
  function error() {
    console.log('No se pudo obtener tu localización');
  }
  navigator.geolocation.getCurrentPosition(localization, error);
};