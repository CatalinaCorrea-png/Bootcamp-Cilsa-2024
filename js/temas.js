document.addEventListener('DOMContentLoaded', () => {

  // const divPAdre = document.querySelector('.fondo');
  const boton1 = document.getElementById('tema1-bt')
  const boton2 = document.getElementById('tema2-bt');
  const divFondo = document.querySelector('.fondo');

  let temaActual = 1;

  boton1.addEventListener('click', () => {
    if (temaActual != 1) 
      temaActual--;
      cambioTema(temaActual);

    console.log("Tema Actual: " + temaActual);
  })

  boton2.addEventListener('click', () => {
    if (temaActual == 1) 
      temaActual++;
    cambioTema(temaActual);

    console.log("Tema Actual: " + temaActual);
  })

function cambioTema(temaActual) {
  switch (temaActual) {
    case 1:
      divFondo.classList.remove('fondo-2');
      break;
    case 2:
      divFondo.classList.add('fondo-2');
      break;
    default:
      break;
  }
}

})
