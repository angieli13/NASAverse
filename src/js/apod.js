const API_KEY = "lhVfoGV0Y85nI5RYxcBIPFiYa1VRB3gCztwB2dIe";
const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

async function obtenerImagen() {

    try {
        
        const respuesta = await fetch(URL);

        
        const datos = await respuesta.json();

        
        document.getElementById("fecha").textContent = "Fecha: " + datos.date;
        document.getElementById("titulo").textContent = datos.title;
        document.getElementById("descripcion").textContent = datos.explanation;

        
        if (datos.media_type === "image") {
            document.getElementById("imagen").src = datos.url;
        } else {
            document.getElementById("imagen").style.display = "none";
        }

    } catch (error) {
        console.log("Ocurrió un error:", error);
    }
}

