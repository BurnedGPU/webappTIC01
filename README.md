# Vita Dynamic Controller APP

Una Progressive Web App (PWA) moderna desarrollada para configurar y monitorear el dispensador de medicamentos inteligente **VITA MELIUS**. Esta aplicación sirve como interfaz de control para un dispositivo ESP32, permitiendo gestionar los intervalos de dosificación y visualizar estadísticas de uso.

![Vita Dynamic Controller](public/pwa-192x192.png)

## 🚀 Características Principales

* **Configuración Multi-Depósito:** Interfaz intuitiva para configurar independientemente los intervalos de tiempo (en segundos) para los 4 depósitos del dispensador.
* **Dashboard de Estadísticas:** Panel visual (modo oscuro) para monitorear niveles de depósitos, historial de dosis y consumo semanal.
* **PWA Instalable:** Gracias a `vite-plugin-pwa`, la aplicación se puede instalar en dispositivos móviles y funcionar como una app nativa.
* **Persistencia de Datos:** Backend robusto que almacena todas las configuraciones en una base de datos **MongoDB** en la nube.
* **Arquitectura Serverless:** Backend desplegado como funciones serverless en Vercel para máxima eficiencia y escalabilidad.

## 🛠️ Stack Tecnológico

### Frontend
* **React** + **Vite**: Para un desarrollo rápido y una interfaz de usuario reactiva.
* **React Router DOM**: Navegación SPA (Single Page Application).
* **Vite PWA Plugin**: Funcionalidades de Progressive Web App.
* **CSS Modules**: Estilos personalizados con paleta de colores moderna (Vite Purple / React Blue).

### Backend
* **Node.js** + **Express**: API RESTful para manejar las peticiones del cliente y del ESP32.
* **Mongoose**: Modelado de objetos (ODM) para interactuar con MongoDB.
* **MongoDB Atlas**: Base de datos NoSQL en la nube.

### Despliegue
* **Vercel**: Hosting del frontend y del backend (serverless functions).

## 📂 Estructura del Proyecto
