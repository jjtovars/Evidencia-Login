// Importamos el paquete mongoose para interactuar con MongoDB
const mongoose = require('mongoose');

// Definimos el esquema para el modelo de usuario
const userSchema = mongoose.Schema({
    // Definimos el campo 'username' que será de tipo String y obligatorio
    username: {
        type: String,
        required: true
    },
    // Definimos el campo 'password' que también será de tipo String y obligatorio
    password: {
        type: String,
        required: true
    },
    // Definimos el campo 'date' que será de tipo Date y tendrá como valor por defecto la fecha actual
    date: {
        type: Date,
        default: Date.now
    }
});

// Exportamos el modelo de usuario utilizando el esquema definido
module.exports = mongoose.model('User', userSchema);