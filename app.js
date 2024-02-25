// Iniciamos el modulo express con el fin de dar inicio al servidor, evitando varias configuraciones
const express = require('express'); //Importamos el paquete
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');

const app = express();

//Lamar al body-parser
app.use(bodyParser.json());

//Importar las rutas
app.use('/auth', authRoute);
/*Middlewares: Es la llamada a una funcion cuando se presenta un evento a una ruta espacifica

app.use('/servicios', () => {
    console.log('Corriendo la Middleware')
});

*/

/* SE CREAN LAS RUTAS */
app.get('/', (req, res) => {
    res.send('Prueba 1 respuesta del servidor'); //Ruta por defecto
});

//Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/Login')
  .then(() => {
    console.log('Conexión establecida a la base de datos MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos MongoDB:', error);
  });
  

//Primero se configura como va escuchar el servidor las peticiones
app.listen(10000, () => {
    console.log('Servidor iniciado en el puerto 10000');
});