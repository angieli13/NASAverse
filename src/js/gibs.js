
// URLs base de GIBS
const GIBS_WMTS_URL = 'https://gibs.earthdata.nasa.gov/wmts-webmerc/';
const GIBS_REST_URL = 'https://gibs.earthdata.nasa.gov/wmts-webmerc/{layer}/default/{date}/GoogleMapsCompatible_Level8/{z}/{y}/{x}.{format}';

// Capas disponibles en GIBS
const GIBS_LAYERS = {
  'MODIS_Aqua_CorrectedReflectance_TrueColor': {
    label: 'MODIS Aqua - Color Real',
    startDate: '2002-07-04',
    format: 'jpg'
  },
  'MODIS_Terra_CorrectedReflectance_TrueColor': {
    label: 'MODIS Terra - Color Real',
    startDate: '2000-02-24',
    format: 'jpg'
  },
  'Corrected_Reflected_Radiation_B1': {
    label: 'Radiación Reflejada',
    startDate: '2012-01-01',
    format: 'png'
  },
  'Sea_Surface_Temp_Aqua_Monthly': {
    label: 'Temperatura Superficie Marina',
    startDate: '2002-07-04',
    format: 'png'
  }
};

// Estado
let gibsState = {
  selectedLayer: 'MODIS_Aqua_CorrectedReflectance_TrueColor',
  selectedDate: new Date().toISOString().split('T')[0]
};

// DOM Elements
const layerSelect = document.getElementById('layer-select');
const dateInput = document.getElementById('date-input');
const loadBtn = document.getElementById('load-btn');
const clearBtn = document.getElementById('clear-gibs-btn');
const loadingDiv = document.getElementById('loading-gibs');
const errorDiv = document.getElementById('error-gibs');
const imageContainer = document.getElementById('image-container');
const gibsImage = document.getElementById('gibs-image');
const imageTitle = document.getElementById('image-title');
const imageInfo = document.getElementById('image-info');
const jsonContainer = document.getElementById('json-gibs-container');
const jsonDisplay = document.getElementById('json-gibs-display');

// Event Listeners
loadBtn.addEventListener('click', handleLoadImage);
clearBtn.addEventListener('click', handleClearGibs);
layerSelect.addEventListener('change', (e) => {
  gibsState.selectedLayer = e.target.value;
});
dateInput.addEventListener('change', (e) => {
  gibsState.selectedDate = e.target.value;
});

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', () => {
  console.log('🛰️ GIBS cargado');
  
  // Establecer fecha actual por defecto
  dateInput.valueAsDate = new Date();
  gibsState.selectedDate = dateInput.value;
});

// Función principal para cargar imagen de GIBS

async function handleLoadImage() {
  console.log('🔍 Cargando imagen GIBS...');
  console.log('   Capa:', gibsState.selectedLayer);
  console.log('   Fecha:', gibsState.selectedDate);
  
  showLoading(true);
  hideError();

  try {
    // Construir URL de GIBS
    const imageUrl = buildGibsUrl(
      gibsState.selectedLayer,
      gibsState.selectedDate
    );

    console.log('🛰️ URL construida:', imageUrl);
    
    // Mostrar la imagen
    displayImage(imageUrl);
    
    // Mostrar parámetros
    showGibsParams();
    
    console.log('✅ Imagen cargada exitosamente');
  } catch (error) {
    console.error('❌ Error:', error.message);
    showError(error.message);
  } finally {
    showLoading(false);
  }
}

// Construir URL de GIBS para la capa y fecha seleccionada

function buildGibsUrl(layer, date) {
  // Formato: /layer/default/YYYY-MM-DD/GoogleMapsCompatible_Level8/{z}/{y}/{x}.{format}
  
  // Para demo, usamos nivel 1 (nivel zoom 1) en las coordenadas 0,0,1
  // Esto carga el mosaico base del mundo
  
  const layerInfo = GIBS_LAYERS[layer];
  const z = 1; // Zoom level
  const x = 0; // Tile X
  const y = 0; // Tile Y
  const format = layerInfo.format;
  
  const url = `${GIBS_WMTS_URL}${layer}/default/${date}/GoogleMapsCompatible_Level8/${z}/${y}/${x}.${format}`;
  
  return url;
}

// mostrar imagen

function displayImage(imageUrl) {
  const layerInfo = GIBS_LAYERS[gibsState.selectedLayer];
  
  imageTitle.textContent = layerInfo.label;
  gibsImage.src = imageUrl;
  imageInfo.textContent = `Fecha: ${gibsState.selectedDate} | Resolución: Level 8 | Proyección: Web Mercator`;
  
  imageContainer.classList.remove('hidden');
  
  console.log('🖼️ Imagen mostrada');
}

// mostrar parametros

function showGibsParams() {
  const params = {
    servicio: 'WMTS',
    capa: gibsState.selectedLayer,
    descripcion: GIBS_LAYERS[gibsState.selectedLayer].label,
    fecha: gibsState.selectedDate,
    proyeccion: 'Web Mercator (EPSG:3857)',
    nivel_zoom: 'Level 8',
    formato: GIBS_LAYERS[gibsState.selectedLayer].format,
    url_base: GIBS_WMTS_URL
  };
  
  jsonContainer.classList.remove('hidden');
  jsonDisplay.textContent = JSON.stringify(params, null, 2);
  
  console.log('📋 Parámetros GIBS:', params);
}

// Ocultar parámetros
function hideGibsParams() {
  jsonContainer.classList.add('hidden');
}


function handleClearGibs() {
  console.log('🗑️ Limpiando GIBS');
  
  imageContainer.classList.add('hidden');
  hideGibsParams();
  hideError();
  gibsImage.src = '';
}
        
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