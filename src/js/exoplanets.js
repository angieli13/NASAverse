import "../styles/exoplanets.css";

const API_URL =
  "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=json&where=koi_prad<2 and koi_teq>180 and koi_teq<303 and koi_disposition like 'CANDIDATE'";

let planetsData = [];
let filteredPlanets = [];
let currentPage = 1;
const perPage = 12;

// Solo iconos de tierra/planeta
const planetIcons = [
  "fa-earth-americas",
  "fa-earth-africa",
  "fa-earth-asia",
];

export async function obtenerExoplanetas() {
  const grid = document.getElementById("exoplanet-grid");
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  try {
    loading.classList.remove("hidden");

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error " + response.status);
    }

    planetsData = await response.json();
    filteredPlanets = [...planetsData];

    loading.classList.add("hidden");

    mostrarPagina();
    activarBusqueda();
    activarPaginacion();
  } catch (err) {
    loading.classList.add("hidden");

    error.textContent = "Error loading exoplanets";
    error.classList.remove("hidden");

    console.error(err);
  }
}

function obtenerIconoPlaneta(index) {
  return planetIcons[index % planetIcons.length];
}

function mostrarPagina() {
  const grid = document.getElementById("exoplanet-grid");

  grid.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  const planets = filteredPlanets.slice(start, end);

  planets.forEach((planet, index) => {
    const card = document.createElement("div");
    card.className = "exo-card";

    // Usar iconos de tierra variados
    const iconClass = obtenerIconoPlaneta(index);

    card.innerHTML = `
      <div class="exo-card-header">
        <i class="fa-solid ${iconClass} exo-icon"></i>
      </div>
      <h3>${planet.kepoi_name || "Unknown Planet"}</h3>
      <div class="exo-info">
        <p>
          <span>
            <i class="fa-solid fa-ruler"></i> Radius
          </span>
          ${(planet.koi_prad || "N/A").toFixed(2)} Earth
        </p>
        <p>
          <span>
            <i class="fa-solid fa-thermometer"></i> Temperature
          </span>
          ${Math.round(planet.koi_teq || 0)} K
        </p>
        <p>
          <span>
            <i class="fa-solid fa-clock"></i> Orbital Period
          </span>
          ${(planet.koi_period || "N/A").toFixed(2)} days
        </p>
        <p>
          <span>
            <i class="fa-solid fa-circle-check"></i> Status
          </span>
          ${planet.koi_disposition}
        </p>
      </div>
    `;

    grid.appendChild(card);
  });

  actualizarPaginacion();
}

function activarBusqueda() {
  const search = document.getElementById("searchPlanet");

  search.addEventListener("input", (e) => {
    const text = e.target.value.toLowerCase();

    filteredPlanets = planetsData.filter((p) =>
      (p.kepoi_name || "").toLowerCase().includes(text)
    );

    currentPage = 1;
    mostrarPagina();
  });
}

function activarPaginacion() {
  document.getElementById("nextBtn").addEventListener("click", () => {
    const totalPages = Math.ceil(filteredPlanets.length / perPage);
    if (currentPage < totalPages) {
      currentPage++;
      mostrarPagina();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      mostrarPagina();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

function actualizarPaginacion() {
  const totalPages = Math.ceil(filteredPlanets.length / perPage);

  document.getElementById("pageInfo").textContent =
    `Page ${currentPage} of ${totalPages}`;

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}