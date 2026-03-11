import './style.css'
import { renderHeader } from './components/header.js'
import { renderFooter } from './components/footer.js'
import { navigate, loadPage } from './js/router.js'

// Cargar header y footer
renderHeader(document.getElementById('header'))
renderFooter(document.getElementById('footer'))

// Evento para manejar navegación por clicks
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="/"]')
  if (link) {
    e.preventDefault()
    navigate(link.getAttribute('href'))
  }
})

// Cargar la página según la URL actual
loadPage(window.location.pathname)