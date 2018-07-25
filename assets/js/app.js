// Fadeout de la página principal
window.onload = () => {
  ready();
};

function ready() {
  const preload = document.getElementById('first');
  let loading = 0;
  const id = setInterval(frame, 64);

  function frame() {
    if (loading === 100) {
      clearInterval(id);
      console.log('holi');   
    } else {
      loading = loading + 1;
      console.log('todavía no');     
      if (loading === 90) {
        preload.style.animation = 'fadeout 1s ease';
      }
    }
  }
}