const API_KEY = "lhVfoGV0Y85nI5RYxcBIPFiYa1VRB3gCztwB2dIe";
const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

async function obtenerImagen() {
  try {
    const respuesta = await fetch(URL);
    const datos = await respuesta.json();

    const fecha = new Date(datos.date);
    const fechaFormateada = fecha.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    document.getElementById("fecha").textContent = fechaFormateada;
    document.getElementById("titulo").textContent = datos.title;
    document.getElementById("descripcion").textContent = datos.explanation;

    const imagen = document.getElementById("imagen");

    if (datos.media_type === "image") {
      imagen.src = datos.url;
      imagen.alt = datos.title;
    } else {
      imagen.closest(".apod-image-wrapper").style.display = "none";
    }

  } catch (error) {
    console.error("Error al obtener la imagen:", error);
  }
}

document.addEventListener("DOMContentLoaded", obtenerImagen);

