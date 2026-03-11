import "../styles/asteroids.css";

const API_KEY = "lhVfoGV0Y85nI5RYxcBIPFiYa1VRB3gCztwB2dIe";

let asteroides = [];
let paginaActual = 1;
const asteroidsPorPagina = 12;

export async function obtenerAsteroids() {
  try {
    const hoy = new Date();
    const enUnaSemana = new Date();

    enUnaSemana.setDate(hoy.getDate() + 7);

    const fechaInicio = hoy.toISOString().split("T")[0];
    const fechaFin = enUnaSemana.toISOString().split("T")[0];

    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${fechaInicio}&end_date=${fechaFin}&api_key=${API_KEY}`;

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    document.getElementById("rango-fechas").textContent =
      `${fechaInicio} — ${fechaFin}`;

    asteroides = Object.values(datos.near_earth_objects).flat();

    paginaActual = 1;

    mostrarEstadisticas();
    renderizarPagina();
    configurarEventosPaginacion();

  } catch (error) {
    console.error("Error Asteroids:", error);
  }
}

function mostrarEstadisticas() {
  const peligrosos = asteroides.filter(
    (a) => a.is_potentially_hazardous_asteroid
  ).length;

  const seguridad = document.getElementById("asteroids-safety");
  const titleContainer = document.querySelector(".asteroids-title-container");

  if (peligrosos > 0) {
    seguridad.innerHTML = `
      <span class="safety-badge peligroso-badge">
        <i class="fa-solid fa-triangle-exclamation"></i>
        ${peligrosos} Peligroso${peligrosos > 1 ? "s" : ""}
      </span>
    `;
  } else {
    seguridad.innerHTML = `
      <span class="safety-badge seguro-badge">
        <i class="fa-solid fa-shield"></i>
        Todos seguros
      </span>
    `;
  }
}

function renderizarPagina() {
  const inicio = (paginaActual - 1) * asteroidsPorPagina;
  const fin = inicio + asteroidsPorPagina;
  const asteroidesEnPagina = asteroides.slice(inicio, fin);

  const lista = document.getElementById("asteroids-list");
  lista.innerHTML = "";

  asteroidesEnPagina.forEach((asteroide) => {
    const esPeligroso =
      asteroide.is_potentially_hazardous_asteroid;

    const diametroMin =
      asteroide.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2);

    const diametroMax =
      asteroide.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2);

    const velocidad =
      parseFloat(
        asteroide.close_approach_data[0].relative_velocity.kilometers_per_hour
      ).toFixed(0);

    const distancia =
      parseFloat(
        asteroide.close_approach_data[0].miss_distance.kilometers
      ).toFixed(0);

    const fecha =
      asteroide.close_approach_data[0].close_approach_date;

    lista.innerHTML += `
      <div class="asteroid-card ${esPeligroso ? "peligroso" : ""}">
        <div class="asteroid-header">
          <img src="/asteroide.png" alt="Asteroide" class="asteroid-img">
          <h3 class="asteroid-name">${asteroide.name}</h3>
        </div>
        <span class="asteroid-badge">
          <i class="fa-solid ${
            esPeligroso ? "fa-exclamation" : "fa-check"
          }"></i>
          ${esPeligroso ? "Peligroso" : "Sin riesgo"}
        </span>
        <ul class="asteroid-info">
          <li><i class="fa-solid fa-circle-dot"></i> Diámetro: ${diametroMin} — ${diametroMax} km</li>
          <li><i class="fa-solid fa-bolt"></i> Velocidad: ${parseInt(velocidad).toLocaleString()} km/h</li>
          <li><i class="fa-solid fa-location-dot"></i> Distancia: ${parseInt(distancia).toLocaleString()} km</li>
          <li><i class="fa-solid fa-calendar-days"></i> Fecha: ${fecha}</li>
        </ul>
      </div>
    `;
  });

  actualizarInfoPaginacion();
}

function actualizarInfoPaginacion() {
  const totalPaginas = Math.ceil(asteroides.length / asteroidsPorPagina);
  const pageInfo = document.getElementById("asteroidPageInfo");
  pageInfo.textContent = `Página ${paginaActual} de ${totalPaginas}`;

  const prevBtn = document.getElementById("prevAsteroidBtn");
  const nextBtn = document.getElementById("nextAsteroidBtn");

  prevBtn.disabled = paginaActual === 1;
  nextBtn.disabled = paginaActual === totalPaginas;
}

function configurarEventosPaginacion() {
  const prevBtn = document.getElementById("prevAsteroidBtn");
  const nextBtn = document.getElementById("nextAsteroidBtn");

  prevBtn.addEventListener("click", () => {
    if (paginaActual > 1) {
      paginaActual--;
      renderizarPagina();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  nextBtn.addEventListener("click", () => {
    const totalPaginas = Math.ceil(asteroides.length / asteroidsPorPagina);
    if (paginaActual < totalPaginas) {
      paginaActual++;
      renderizarPagina();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}