// Fadeout de la página principal
const preload = document.getElementById('first');
setTimeout(() => {
  preload.style.animation = 'fadeout 1s ease';
  preload.style.display = 'none';
  main.style.animation = 'fadein 1s ease';
}, 2000);