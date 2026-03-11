const routes = {
  "/": "/src/pages/home.html",
  "/apod": "/src/pages/apod.html",
  "/asteroids": "/src/pages/asteroids.html",
  "/exoplanets": "/src/pages/exoplanets.html",
  "/gibs": "/src/pages/gibs.html",
};

async function loadPage(path) {
  const page = routes[path] || routes["/"];
  const appElement = document.getElementById("app");
  const body = document.body;

  try {
    const response = await fetch(page);
    const html = await response.text();

    appElement.innerHTML = html;

    // Agregar/remover clase home-page-active al body
    if (path === "/") {
      body.classList.add("home-page-active");
    } else {
      body.classList.remove("home-page-active");
    }

    // Ejecutar funciones específicas de cada página
    if (path === "/apod") {
      const { obtenerImagen } = await import('./apod.js');
      obtenerImagen();
    }
    if (path === "/asteroids") {
      const { obtenerAsteroids } = await import('./asteroids.js');
      obtenerAsteroids();
    }
    if (path === "/exoplanets") {
      const { obtenerExoplanetas } = await import('./exoplanets.js');
      obtenerExoplanetas();
    }
    if (path === "/gibs") {
      const { obtenerGibs } = await import('./gibs.js');
      obtenerGibs();
    }

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

export { navigate, loadPage };