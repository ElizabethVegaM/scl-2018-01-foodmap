// Fadeout de la página principal
const preload = document.getElementById('first');
setTimeout(() => {
  preload.style.animation = 'fadeout 1s ease';
  preload.style.display = 'none';
  main.style.animation = 'fadein 1s ease';
}, 3000);

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