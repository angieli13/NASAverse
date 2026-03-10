function loadFooter() {
  document.getElementById("footer").innerHTML = `
    <footer class="footer">
      <p class="footer-text">
        © 2025 NASAverse — By Diego García & Angie Cómbita — Data of <a href="https://api.nasa.gov" target="_blank">NASA APIs</a>
      </p>
    </footer>
  `;
}

document.addEventListener("DOMContentLoaded", loadFooter);