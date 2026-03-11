export function renderHeader(element) {
  element.innerHTML = `
    <nav class="navbar">
      <div class="logo">
        <a href="/">
          <img src="/logo.gif" alt="NASAverse Logo">
        </a>
      </div>
      <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/apod">APOD</a></li>
        <li><a href="/asteroids">Asteroides</a></li>
        <li><a href="/exoplanets">Exoplanetas</a></li>
        <li><a href="/gibs">GIBS</a></li>
      </ul>
    </nav>
  `;
}