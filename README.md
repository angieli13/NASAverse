# NASAverse - API con Node.js y Vite

## Índice

1. [Introducción](#1-introducción)
2. [API´s NASA](#2-apis-nasa)
3. [Branding](#3-branding)
4. [Resumen del proyecto](#4-resumen-del-proyecto)
5. [Objetivos del proyecto](#5-objetivos-del-proyecto)
6. [Tecnologías utilizadas](#6-tecnologías-utilizadas)
7. [Estructura del proyecto](#7-estructura-del-proyecto)
8. [Pistas, tips y lecturas complementarias](#8-pistas-tips-y-lecturas-complementarias)

---

# 1. Introducción

**NASAverse** es una aplicación web que consume APIs públicas de la NASA para mostrar información astronómica en tiempo real.

El objetivo del proyecto es permitir a los usuarios explorar diferentes datos espaciales como:

- Imagen astronómica del día
- Asteroides cercanos a la Tierra
- Exoplanetas descubiertos
- Imágenes satelitales del espacio

La aplicación está desarrollada utilizando **Node.js**, **Vite** y **JavaScript moderno**, permitiendo una experiencia rápida e interactiva.

---

# 2. API´s NASA

En este proyecto utilizamos **cuatro APIs públicas de la NASA**, las cuales proporcionan diferentes tipos de datos astronómicos y científicos. Para acceder a estos servicios utilizamos una **API Key personal**, lo que nos permite realizar **más de 100 solicitudes por hora**, evitando limitaciones o bloqueos durante el uso de la aplicación.

Las APIs utilizadas en el proyecto son:

- **APOD (Astronomy Picture of the Day)**  
  Proporciona la imagen astronómica del día junto con su explicación científica, permitiendo explorar fotografías y fenómenos del universo capturados por telescopios y misiones espaciales.

- **Asteroids NeoWs (Near Earth Object Web Service)**  
  Permite consultar información sobre **asteroides cercanos a la Tierra**, incluyendo su tamaño, velocidad, distancia y posibles aproximaciones al planeta.

- **Exoplanet API**  
  Ofrece datos sobre **exoplanetas**, es decir, planetas que se encuentran fuera de nuestro sistema solar. Esta API permite explorar características como masa, radio, temperatura y estrellas anfitrionas.

- **GIBS (Global Imagery Browse Services)**  
  Proporciona **imágenes satelitales de la Tierra en tiempo casi real**, permitiendo visualizar fenómenos naturales, cambios climáticos y observaciones del planeta captadas por satélites de la NASA.

Tomado de: https://api.nasa.gov/

---

# 3. Branding

---

# 4. Resumen del proyecto

Una **API** es un servidor web que escucha en un puerto de red y permite enviar solicitudes (**request**) y recibir respuestas (**response**) utilizando el protocolo **HTTP**.

Un servidor web debe:

- Manejar solicitudes entrantes
- Procesar la información
- Enviar respuestas al cliente

En este proyecto, **Node.js** actúa como el servidor que permite consumir y procesar datos provenientes de las APIs públicas de la NASA.

NASAverse integra múltiples APIs, permitiendo a los usuarios explorar información científica de manera sencilla e interactiva.

---

# 5. Objetivos del proyecto

Este proyecto busca aplicar conocimientos en:

## Node.js

- Instalación y uso de módulos con **npm**

https://docs.npmjs.com/

---

## JavaScript

- Uso de **ES6+**
- Uso de **fetch / async / await**
- Manejo de APIs REST
- Uso de **ESLint** para mantener código limpio

---

## Vite

- Configuración del entorno de desarrollo
- Compilación rápida de aplicaciones web
- Optimización del rendimiento

https://vitejs.dev/

---

## Control de versiones (Git y GitHub)

### Git

- Instalación y configuración
- Control de versiones
- Manejo de ramas

https://git-scm.com/

---

### GitHub

- Creación de repositorios
- Pull Requests
- Code Review
- Issues
- Proyectos

https://github.com/

---

# 6. Tecnologías utilizadas

- **Node.js**
- **Vite**
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**
- **ESLint**
- **Git / GitHub**
- **APIs públicas de la NASA**

---

# 7. Estructura del proyecto

```
├───public
│       bhome.gif
│       logo.gif
│       vite.svg
│
└───src
    │   counter.js
    │   javascript.svg
    │   main.js
    │   style.css
    │
    ├───components
    │       footer.js
    │       header.js
    │
    ├───js
    │       apod.js
    │       asteroids.js
    │       exoplanets.js
    │       gibs.js
    │       router.js
    │       utils.js
    │
    ├───pages
    │       apod.html
    │       asteroids.html
    │       exoplanets.html
    │       gibs.html
    │       home.html
    │
    └───styles
            apod.css
            asteroids.css
            exoplanets.css
            gibs.css
    │
    ├───pages
    │       apod.html
    │       asteroids.html
    │       exoplanets.html
    │       gibs.html
    │       home.html
    │
    └───styles
            apod.css
            asteroids.css
            exoplanets.css
            gibs.css
    ├───pages
    │       apod.html
    │       asteroids.html
    │       exoplanets.html
    │       gibs.html
    │       home.html
    │
    └───styles
            apod.css
            asteroids.css
            exoplanets.css
            gibs.css
            gibs.css
            global.css
            layout.css
```

---

# 8. Pistas, tips y lecturas complementarias

### APIs de la NASA

https://api.nasa.gov/

### Documentación de Node.js

https://nodejs.org/

### Documentación de Vite

https://vitejs.dev/

### JavaScript moderno

https://developer.mozilla.org/es/docs/Web/JavaScript

### Postman (para probar APIs)

https://www.postman.com/

### ESLint

https://eslint.org/
