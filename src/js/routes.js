const routes = {
  "/": "/home.html",
  "/apod": "/apod.html",
  "/asteroids": "/asteroids.html",
  "/exoplanets": "/exoplanets.html",
  "/gibs": "/gibs.html",
};

function getRoute(path) {
  return routes[path] || routes["/"];
}

export { routes, getRoute };