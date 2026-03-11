import "../styles/apod.css";

const API_KEY = "lhVfoGV0Y85nI5RYxcBIPFiYa1VRB3gCztwB2dIe";

export async function obtenerImagen() {

  const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

  try {

    const respuesta = await fetch(URL);
    const datos = await respuesta.json();

    console.log("APOD:", datos);

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

  }

}


