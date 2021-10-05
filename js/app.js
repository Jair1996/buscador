const marca = document.getElementById("marca");
const minimo = document.getElementById("minimo");
const maximo = document.getElementById("maximo");
const puertas = document.getElementById("puertas");
const transmision = document.getElementById("transmision");
const color = document.getElementById("color");
const year = document.getElementById("year");

const resultado = document.getElementById("resultado");

const max = new Date().getFullYear();
const min = max - 10;

const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

const limpiarHTML = () => {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
};

const mostrarAutos = (autos) => {
  limpiarHTML();

  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const autoHTML = document.createElement("p");

    autoHTML.textContent = `
      ${marca} ${modelo} - ${year} ${puertas} Puertas - Transmisión: ${transmision} 
      - Precio: ${precio} - Color: ${color}
    `;

    resultado.appendChild(autoHTML);
  });
};

const llenarSelect = () => {
  for (let i = max; i >= min; i--) {
    const option = document.createElement("option");

    option.value = i;
    option.textContent = i;

    year.appendChild(option);
  }
};

const noResultado = () => {
  limpiarHTML();

  const noResultado = document.createElement("div");

  noResultado.classList.add("alerta", "error");
  noResultado.textContent =
    "No hay resultados, intenta con otros téminos de búsqueda";

  resultado.appendChild(noResultado);
};

const filterByFeature = (auto, feature) => {
  if (datosBusqueda[`${feature}`]) {
    if (feature === "minimo" || feature === "maximo") {
      if (feature === "minimo") {
        return auto.precio >= datosBusqueda[`${feature}`];
      }

      if (feature === "maximo") {
        return auto.precio <= datosBusqueda[`${feature}`];
      }
    } else {
      if (datosBusqueda[`${feature}`]) {
        return auto[`${feature}`] === datosBusqueda[`${feature}`];
      }
    }
  }

  return auto;
};

const filtrarAuto = () => {
  const resultado = autos
    .filter((auto) => filterByFeature(auto, "marca"))
    .filter((auto) => filterByFeature(auto, "year"))
    .filter((auto) => filterByFeature(auto, "minimo"))
    .filter((auto) => filterByFeature(auto, "maximo"))
    .filter((auto) => filterByFeature(auto, "puertas"))
    .filter((auto) => filterByFeature(auto, "transmision"))
    .filter((auto) => filterByFeature(auto, "color"));

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
};

marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;

  filtrarAuto();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = parseInt(e.target.value);
  filtrarAuto();
});

minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;
  filtrarAuto();
});

maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;
  filtrarAuto();
});

puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);
  filtrarAuto();
});

transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});

color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();
});

document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos);
  llenarSelect();
});
