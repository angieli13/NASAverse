
const API_BASE = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI';


const QUERIES = {
  kepler: {
    table: 'exoplanets',
    where: 'pl_kepflag=1',
    label: 'Kepler Confirmados'
  },
  transit: {
    table: 'exoplanets',
    where: 'pl_tranflag=1',
    label: 'En Tránsito'
  },
  habitable: {
    table: 'exoplanets',
    where: 'pl_rade<1.6 and pl_eqt>200 and pl_eqt<300',
    label: 'Potencialmente Habitables'
  }
};

// Estado de la aplicación
let appState = {
  planets: [],
  currentFilter: 'kepler'
};

// DOM Elements
const container = document.getElementById('exoplanet-container');
const filterSelect = document.getElementById('filter-type');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const resultsInfo = document.getElementById('results-info');
const planetsGrid = document.getElementById('planets-grid');
const planetCount = document.getElementById('planet-count');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
clearBtn.addEventListener('click', handleClear);
filterSelect.addEventListener('change', (e) => {
  appState.currentFilter = e.target.value;
});

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', () => {
  handleSearch();
});

// Función principal de búsqueda
async function handleSearch() {
  const filterType = appState.currentFilter;
  const query = QUERIES[filterType];

  showLoading(true);
  hideError();

  try {
    const data = await fetchExoplanets(query);
    appState.planets = data;
    renderPlanets(data);
    showResults(data.length);
  } catch (error) {
    showError(error.message);
    console.error('Error fetching exoplanets:', error);
  } finally {
    showLoading(false);
  }
}


async function fetchExoplanets(query) {
  const params = new URLSearchParams({
    table: query.table,
    format: 'json',
    where: query.where,
    order: 'pl_eqt asc'
  });

  const url = `${API_BASE}?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo conectar a la API`);
  }

  const data = await response.json();
  return data;
}

// Renderizar tarjetas de planetas
function renderPlanets(planets) {
  planetsGrid.innerHTML = '';

  if (planets.length === 0) {
    planetsGrid.innerHTML = '<p class="no-results">No se encontraron planetas</p>';
    return;
  }

  // Limitar a 20 resultados para mejor rendimiento visual
  const displayPlanets = planets.slice(0, 20);

  displayPlanets.forEach(planet => {
    const card = createPlanetCard(planet);
    planetsGrid.appendChild(card);
  });
}

// Crear una tarjeta individual
function createPlanetCard(planet) {
  const card = document.createElement('div');
  card.className = 'planet-card';

  // Extraer datos, usando valores por defecto si no existen
  const name = planet.pl_name || 'Desconocido';
  const host = planet.hostname || 'Estrella desconocida';
  const radius = planet.pl_rade ? planet.pl_rade.toFixed(2) : 'N/A';
  const mass = planet.pl_bmasse ? planet.pl_bmasse.toFixed(2) : 'N/A';
  const eqTemp = planet.pl_eqt ? Math.round(planet.pl_eqt) : 'N/A';
  const distance = planet.sy_dist ? planet.sy_dist.toFixed(2) : 'N/A';

  // 
  const emoji = getEmojiForPlanet(planet);

  card.innerHTML = `
    <div class="card-emoji">${emoji}</div>
    <h3 class="planet-name">${name}</h3>
    <p class="planet-host">⭐ ${host}</p>
    
    <div class="planet-stats">
      <div class="stat">
        <span class="stat-label">Radio</span>
        <span class="stat-value">${radius} R⊕</span>
      </div>
      <div class="stat">
        <span class="stat-label">Masa</span>
        <span class="stat-value">${mass} M⊕</span>
      </div>
      <div class="stat">
        <span class="stat-label">Temp Eq.</span>
        <span class="stat-value">${eqTemp} K</span>
      </div>
      <div class="stat">
        <span class="stat-label">Distancia</span>
        <span class="stat-value">${distance} pc</span>
      </div>
    </div>
  `;

  return card;
}


function getEmojiForPlanet(planet) {
  const radius = planet.pl_rade || 0;
  const temp = planet.pl_eqt || 0;

  if (radius < 1.25 && temp > 200 && temp < 300) return '🟢'; // Potencialmente habitable
  if (radius > 9) return '🟠'; // Júpiter-like
  if (radius < 2) return '⚪'; // Tierra-like
  if (temp > 1000) return '🔥'; // Muy caliente
  if (temp < 200) return '🧊'; // Muy frío

  return '🌍';
}

// Limpiar resultados
function handleClear() {
  appState.planets = [];
  planetsGrid.innerHTML = '';
  resultsInfo.classList.add('hidden');
  errorDiv.classList.add('hidden');
}

// Utilidades de UI
function showLoading(show) {
  loadingDiv.classList.toggle('hidden', !show);
}

function showError(message) {
  errorDiv.textContent = `❌ Error: ${message}`;
  errorDiv.classList.remove('hidden');
}

function hideError() {
  errorDiv.classList.add('hidden');
}

function showResults(count) {
  planetCount.textContent = count;
  resultsInfo.classList.remove('hidden');
}