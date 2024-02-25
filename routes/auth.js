const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Ruta para crear un nuevo usuario
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'El usuario no está registrado' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        res.json({ message: 'Autenticación satisfactoria' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener un usuario por su ID
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para eliminar un usuario por su ID
router.delete('/:userId', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para actualizar un usuario por su ID
router.patch('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
