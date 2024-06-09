

// Variables 
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Resultados de autos
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

// Objeto busqueda en los select 
const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision : '',
    color : ''
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Muestra los autos al cargar
    // llena el select de los year
    llenarSelect();
})

marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
})

year.addEventListener('change', (e) => {
    // Parse Int convierte el String que inicia del arreglo en un entero
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
})

minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
})

maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
})

puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
})

transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})

color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
    //console.log(datosBusqueda);
})

// Funciones 
function mostrarAutos(autos) {
    
    limpiarHTML(); // Elimina el HTML previo

    autos.forEach(auto => {
        
        // Destructuring 
        const { marca, modelo, year, precio, puertas, color, transmision } = auto;
        const autoHTML = document.createElement('p');


        autoHTML.textContent = `
        
            ${marca} ${modelo} - Precio: ${precio} - Año: ${year} -  ${puertas} Puertas - ${color} - ${transmision}
        `;

        // Agregando al DOM element
        resultado.appendChild(autoHTML);
    })
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}


// Genera los year del campo select 
function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option); // Agrega el elemento en cada vuelta de validacion del FOR
    }
}

// Funcion que filtra en base a la busqueda
// Funcion de Alto Nivel: Es una funcion que toma otra funcion como parametro
function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter(filtrarYear).filter( filtrarMinimo). filter( filtrarMaximo).filter( filtrarPuertas).filter( filtrarTransmision).filter( filtrarColor);

    // console.log(resultado);
    // Si hay resultados muestra la busqueda
    // Muestra los resultados filtrados de la busqueda
    if(resultado.length){
        mostrarAutos(resultado);
        
    } else {
        noResultado();
    }
}

function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add( 'alerta', 'error');
    noResultado.textContent = 'No hay resultados, Intenta con otros términos de búsqueda.';
    resultado.appendChild(noResultado);
}

function filtrarMarca (auto) {
    const { marca} = datosBusqueda;

    if (marca) {
        return auto.marca === marca;
    }
    // En caso contrario retorna todos los autos
    return auto;
}

function filtrarYear (auto) {
    const { year } = datosBusqueda;

    if(year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo (auto) {
    const { minimo } = datosBusqueda;

    if(minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo (auto) {
    const { maximo } = datosBusqueda;

    if(maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas (auto) {
    const { puertas } = datosBusqueda;

    if (puertas) {
        return auto.puertas === puertas;
    }

    return auto;
}

function filtrarTransmision (auto) {
    const { transmision } = datosBusqueda;

    if (transmision) {
        return auto.transmision === transmision;
    }

    return auto;
}

function filtrarColor (auto) {
    const { color } = datosBusqueda;

    if (color) {
        return auto.color === color;
    }

    return auto;
}