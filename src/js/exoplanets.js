import "../styles/exoplanets.css";
const API_URL =
"https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=json&where=koi_prad<2 and koi_teq>180 and koi_teq<303 and koi_disposition like 'CANDIDATE'";

let planetsData = [];
let currentPage = 1;
const perPage = 9;

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

function mostrarPagina() {

const grid = document.getElementById("exoplanet-grid");

grid.innerHTML = "";

const start = (currentPage - 1) * perPage;
const end = start + perPage;

const planets = planetsData.slice(start, end);

planets.forEach(planet => {

const card = document.createElement("div");
card.className = "exo-card";

card.innerHTML = `

<h3>${planet.kepoi_name || "Unknown Planet"}</h3>

<div class="exo-info">

<p><span>Radius</span>${planet.koi_prad || "N/A"} Earth</p>

<p><span>Temperature</span>${planet.koi_teq || "N/A"} K</p>

<p><span>Orbital Period</span>${planet.koi_period || "N/A"} days</p>

<p><span>Status</span>${planet.koi_disposition}</p>

</div>

`;

grid.appendChild(card);

});

actualizarPaginacion();

}

function activarBusqueda(){

const search = document.getElementById("searchPlanet");

search.addEventListener("input", e => {

const text = e.target.value.toLowerCase();

const filtrados = planetsData.filter(p =>
(p.kepoi_name || "").toLowerCase().includes(text)
);

mostrarFiltrados(filtrados);

});

}

function mostrarFiltrados(planets){

const grid = document.getElementById("exoplanet-grid");

grid.innerHTML="";

planets.slice(0,20).forEach(planet=>{

const card=document.createElement("div");
card.className="exo-card";

card.innerHTML=`

<h3>${planet.kepoi_name}</h3>

<p>Radius: ${planet.koi_prad || "N/A"} Earth</p>

<p>Temperature: ${planet.koi_teq || "N/A"} K</p>

<p>Orbital: ${planet.koi_period || "N/A"} days</p>

<p>Status: ${planet.koi_disposition}</p>

`;

grid.appendChild(card);

});

}

function activarPaginacion(){

document.getElementById("nextBtn").onclick = () => {
currentPage++;
mostrarPagina();
};

document.getElementById("prevBtn").onclick = () => {
if(currentPage > 1){
currentPage--;
mostrarPagina();
}
};

}

function actualizarPaginacion(){

const totalPages = Math.ceil(planetsData.length / perPage);

document.getElementById("pageInfo").textContent =
`Page ${currentPage} of ${totalPages}`;

}