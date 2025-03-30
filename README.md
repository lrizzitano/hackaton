# Ethos Market 🌍

Ethos Market es una aplicación web de comercio electrónico mayorista que ofrece productos sustentables con el medio ambiente. Desarrollado con el stack MERN (MongoDB, Express, React y Node.js), este proyecto tiene como objetivo proporcionar una plataforma eficiente y amigable para la compra y venta de productos ecológicos al por mayor.

## 🌎 Acceso a la versión desplegada

Puedes acceder a la versión en producción del proyecto en Render a través del siguiente enlace:

🔗 [Ethos Market - Deploy](https://hackathon-9hw7.onrender.com/)

## 🚀 Requisitos previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/) versión **22.11**
- [npm](https://www.npmjs.com/) versión **10.9.1**

## 🛠 Instalación y ejecución

Sigue estos pasos para buildear y ejecutar el proyecto:

1. 📂 Clona el repositorio:

   ```sh
   git clone https://github.com/lrizzitano/hackaton.git
   cd EthosMarket
   ```

En Linux se puede usar el script run.sh para generar la build y ejecutar el servidor con un solo script de la siguiente manera:
```sh
. run.sh
```
En otro caso se puede hacer la build y ejecutar el servidor por sepadado de la siguiente manera:

2. 📦 Genera la build:

   ```sh
   npm run build
   ```

4. ▶️ Ejecuta el servidor según tu sistema operativo:

   - En **Linux**:
     ```sh
     npm run start
     ```
   - En **Windows**:
     ```sh
     # Asegurar que la variable de entorno NODE_ENV esté en "producción"
     $env:NODE_ENV="production"
     
     # Levantar el servidor
     node backend/server.js
     ```

5. 🌐 Accede a la aplicación en tu navegador:

   ```
   http://localhost:5000
   ```

## 🏗 Tecnologías utilizadas

- **MongoDB**: Base de datos NoSQL para almacenamiento eficiente de datos.
- **Express.js**: Framework de backend para gestionar rutas y lógica del servidor.
- **React.js**: Biblioteca para la interfaz de usuario interactiva y dinámica.
- **Node.js**: Entorno de ejecución para el backend de la aplicación.

✨ ¡Gracias por usar Ethos Market! 🌱

