const routes = {
  "/": "/src/pages/home.html",
  "/apod": "/src/pages/apod.html",
  "/asteroids": "/src/pages/asteroids.html",
  "/exoplanets": "/src/pages/exoplanets.html",
  "/gibs": "/src/pages/gibs.html",
};

async function loadPage(path) {
  const page = routes[path] || routes["/"];

  try {
    const response = await fetch(page);
    const html = await response.text();

    document.getElementById("app").innerHTML = html;

    
    if (path === "/apod") obtenerImagen();
    if (path === "/asteroids") obtenerAsteroids();
    if (path === "/exoplanets") obtenerExoplanetas();
    if (path === "/gibs") obtenerGibs();

  } catch (error) {
    console.error("Error cargando la página:", error);
  }
}

function navigate(path) {
  window.history.pushState({}, "", path);
  loadPage(path);
}

window.addEventListener("popstate", () => {
  loadPage(window.location.pathname);
});


document.addEventListener("DOMContentLoaded", () => {
  loadPage(window.location.pathname);
});

export { navigate };
