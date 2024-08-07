const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
  formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
  e.preventDefault();

  // Validar
  const ciudad = document.querySelector('#ciudad').value;
  const pais = document.querySelector('#pais').value;

  // console.log(ciudad);
  // console.log(pais);

  if( ciudad === '' || pais === '' ) {
    mostrarError('Ambos campos son obligatorios');

    return;
  }

  // Consultar en la API
  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
  const alerta = document.querySelector('.bg-red-100');

  if( !alerta ) {
    const alerta = document.createElement('DIV');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
    
    alerta.innerHTML = `
      <strong class="fond-bold">Error!</strong>
      <span class="block">${mensaje}</span>
    `;
  
    container.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 2000);
  }
}

function consultarAPI(ciudad, pais) {
  const appId = '80e3ed2d80510fa939c2302c95564183';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  fetch(url)
    .then( respuesta => respuesta.json())
    .then( datos => {
      console.log(datos)
      if( datos.cod === "404") {
        mostrarError('Ciudad no encontrada');
      }
    })
}