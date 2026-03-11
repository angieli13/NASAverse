import "../styles/gibs.css";

export function obtenerGibs(){

const grid = document.getElementById("gibsGrid");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const baseURL = "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi";

const layers = [

{
name:"Blue Marble",
layer:"BlueMarble_ShadedRelief",
desc:"Global Earth topography"
},

{
name:"Coastlines",
layer:"Coastlines",
desc:"Global coastline reference layer"
},

{
name:"Reference Features",
layer:"Reference_Features",
desc:"Geographic reference features"
},

{
name:"MODIS True Color",
layer:"MODIS_Terra_CorrectedReflectance_TrueColor",
desc:"Natural satellite color imagery"
},

{
name:"MODIS Bands 721",
layer:"MODIS_Terra_CorrectedReflectance_Bands721",
desc:"False color imagery highlighting vegetation and water"
},

{
name:"Snow Cover",
layer:"MODIS_Terra_Snow_Cover",
desc:"Global snow cover detected by satellite"
}

];

try{

layers.forEach(l => {

const url =
`${baseURL}?service=WMS&version=1.1.1&request=GetMap&layers=${l.layer}&styles=&bbox=-180,-90,180,90&srs=EPSG:4326&width=800&height=400&format=image/png&transparent=true`;

const card = document.createElement("div");
card.className = "gibs-card";

card.innerHTML = `
<img src="${url}" alt="${l.name}">
<h3>${l.name}</h3>
<p>${l.desc}</p>
`;

grid.appendChild(card);

});

loading.style.display="none";

}catch(err){

loading.style.display="none";
error.textContent="Error loading GIBS imagery";
console.error(err);

}

}