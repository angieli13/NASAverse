
const isProd = import.meta.env.PROD;

// Lista de páginas y sus rutas
function generateRoutes() {
  // 
  const pages = ["home", "apod", "asteroids", "exoplanets", "gibs"];
  const routes = {};

  pages.forEach(page => {
    const path = page === "home" ? "/" : `/${page}`;

    
    if (isProd) {
      // 
      routes[path] = `/assets/${page}.js`; 
    } else {
      routes[path] = `/src/pages/${page}.html`;
    }
  });

  return routes;
}

const routes = generateRoutes();

function getRoute(path) {
  return routes[path] || routes["/"];
}

export { routes, getRoute };
