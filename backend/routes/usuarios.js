const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); // Asegúrate de tener la ruta correcta al modelo

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Añade aquí más rutas según sea necesario

module.exports = router;
