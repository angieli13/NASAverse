import "../styles/apod.css";

const API_KEY = "lhVfoGV0Y85nI5RYxcBIPFiYa1VRB3gCztwB2dIe";

export async function obtenerImagen() {

  const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

  try {

    const respuesta = await fetch(URL);
    const datos = await respuesta.json();

    console.log("APOD:", datos);

  
    if (datos.code === 500 || !datos.date) {
      mostrarError();
      return;
    }

    const fecha = new Date(datos.date);

    const fechaFormateada = fecha.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    document.getElementById("fecha").textContent = fechaFormateada;
    document.getElementById("titulo").textContent = datos.title;
    document.getElementById("descripcion").textContent = datos.explanation;

    const imagen = document.getElementById("imagen");

    if (datos.media_type === "image") {
      imagen.src = datos.url;
      imagen.alt = datos.title;
    } else {
      document.querySelector(".apod-image-wrapper").innerHTML =
        `<iframe src="${datos.url}" frameborder="0" allowfullscreen></iframe>`;
    }

  } catch (error) {

    console.error("Error APOD:", error);
    mostrarError();

  }

}

function mostrarError() {
  document.getElementById("fecha").textContent = "";
  document.getElementById("titulo").textContent = "Sin datos disponibles";
  document.getElementById("descripcion").innerHTML =
    `<i class="fa-solid fa-satellite"></i> La NASA no ha cargado los datos del día de hoy. Vuelve más tarde`;
  document.querySelector(".apod-image-wrapper").style.display = "none";
}
