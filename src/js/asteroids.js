const API_KEY = "lhVfoGV0Y85nI5RYxcBIPFiYa1VRB3gCztwB2dIe";

async function obtenerAsteroides() {
  try {

    const hoy = new Date();
    const enUnaSemana = new Date();
    enUnaSemana.setDate(hoy.getDate() + 7);

    const fechaInicio = hoy.toISOString().split("T")[0];
    const fechaFin = enUnaSemana.toISOString().split("T")[0];

    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${fechaInicio}&end_date=${fechaFin}&api_key=${API_KEY}`;

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    document.getElementById("rango-fechas").textContent = fechaInicio + " — " + fechaFin;

    const asteroides = Object.values(datos.near_earth_objects).flat();

    const lista = document.getElementById("asteroids-list");

    asteroides.forEach(function(asteroide) {

      const esPeligroso = asteroide.is_potentially_hazardous_asteroid;
      const diametroMin = asteroide.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2);
      const diametroMax = asteroide.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2);
      const velocidad = parseFloat(asteroide.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(0);
      const distancia = parseFloat(asteroide.close_approach_data[0].miss_distance.kilometers).toFixed(0);
      const fecha = asteroide.close_approach_data[0].close_approach_date;

      lista.innerHTML += `
        <div class="asteroid-card ${esPeligroso ? "peligroso" : ""}">
          <h3 class="asteroid-name">${asteroide.name}</h3>
          <span class="asteroid-badge">${esPeligroso ? "⚠️ Peligroso" : "✅ Sin riesgo"}</span>
          <ul class="asteroid-info">
            <li>📏 Diámetro: ${diametroMin} — ${diametroMax} km</li>
            <li>💨 Velocidad: ${parseInt(velocidad).toLocaleString()} km/h</li>
            <li>📍 Distancia: ${parseInt(distancia).toLocaleString()} km</li>
            <li>📅 Fecha: ${fecha}</li>
          </ul>
        </div>
      `;
    });

  } catch (error) {
    console.error("Ocurrió un error:", error);
  }
}

document.addEventListener("DOMContentLoaded", obtenerAsteroides);