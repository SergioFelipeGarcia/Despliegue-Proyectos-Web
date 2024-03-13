const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const port = process.env.PORT || 443;
const path = require('path');

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Rutas y controladores
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
  const myVariable = "Hola desde index.js";
});

app.get('/index', (req, res) => {
  res.redirect('/index.html');
});

// Configuraciones directas
const config = {
  database: {
    username: "sergio",
    password: "sergio"
  },
  // Otras configuraciones aquí...
};

// Lógica de inicialización
const initializeApp = () => {
  try {
    // Accede a la configuración específica, por ejemplo, datos de la base de datos
    const databaseUsername = config.database.username;
    const databasePassword = config.database.password;

    // Arranca el servidor después de la carga exitosa
    https.createServer({
      cert: fs.readFileSync('server.cer'),
      key: fs.readFileSync('server.key')
    }, app).listen(port, () => {
      console.log(`Servidor Express escuchando en el puerto ${port}`);
    });
  } catch (error) {
    // Manejo de errores durante el arranque
    console.error('Error durante el arranque:', error.message);

    // Puedes mostrar mensajes informativos al usuario
    console.error('La aplicación no pudo iniciar correctamente. Por favor, inténtalo de nuevo.');
    // También puedes redirigir a una página de error o realizar otras acciones necesarias
  }
};

// Inicializar la aplicación
initializeApp();

// Configuración para evitar la inspección de directorios
app.use('/confidenciales', express.static(path.join(__dirname, 'confidenciales'), { index: false }));

app.use('/confidenciales', (req, res, next) => {
  res.status(403).send('Acceso prohibido. No tienes permisos para acceder a esta ruta.');
});
//Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal en el servidor.');
});