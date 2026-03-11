import { getRoute } from './routes.js';

async function loadPage(path) {
  const page = getRoute(path);
  const appElement = document.getElementById("app");
  const body = document.body;

  try {
    const response = await fetch(page);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();

    appElement.innerHTML = html;

    // Espera a que el DOM se actualice antes de manipularlo
    await new Promise(resolve => requestAnimationFrame(resolve));

    if (path === "/") body.classList.add("home-page-active");
    else body.classList.remove("home-page-active");

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

window.addEventListener("popstate", () => loadPage(window.location.pathname));

export { navigate, loadPage };
