const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paisSelect = document.querySelector('#pais');
const selectCiudad = document.querySelector('#ciudad');

window.addEventListener('load', () => {
  formulario.addEventListener('submit', buscarClima);
})

paisSelect.addEventListener('change', consultarJSON);

function consultarJSON() {
  fetch('db/ciudades.json')
    .then( respuesta => respuesta.json() )
    .then( paises => llenarSelectCiudades(paises) )
}

function llenarSelectCiudades( paises ) {
  for(const [key, value] of Object.entries(paises)){
    if ( key === paisSelect.value) {
      selectCiudad.innerHTML = ``;

      paises[key].forEach( ciudad => {
        const option = document.createElement('OPTION');
        option.setAttribute('value', ciudad);
        option.textContent = ciudad;
        selectCiudad.appendChild(option);
      });
    }
  }
}

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
      //Imprime la respuesta en el HTML
      mostrarClima(datos);
    })
}

function mostrarClima(datos) {
  limpiarHTML();

  const { main: { temp, temp_max, temp_min } } = datos;
  const centigrados = Math.round(temp - 273.15);

  const actual = document.createElement('P');
  actual.innerHTML = `${centigrados} &#8451;`;
  actual.classList.add('font-bold', 'text-6xl');

  const resultadoDiv = document.createElement('DIV');
  resultadoDiv.classList.add('text-center', 'text-white');
  resultadoDiv.appendChild(actual);

  resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
  while(resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}