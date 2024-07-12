const express = require('express');
const router = express.Router();
const Alojamiento = require('../models/Alojamiento');

// Obtener todos los alojamientos
router.get('/', async (req, res) => {
    try {
        const alojamientos = await Alojamiento.find();
        res.json(alojamientos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener un alojamiento específico por ID
router.get('/:id', async (req, res) => {
    try {
        const alojamiento = await Alojamiento.findById(req.params.id);
        if (!alojamiento) return res.status(404).json({ message: 'Alojamiento no encontrado' });
        res.json(alojamiento);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear un nuevo alojamiento
router.post('/', async (req, res) => {
    const alojamiento = new Alojamiento({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        caracteristicas: req.body.caracteristicas,
        capacidad: req.body.capacidad,
        imagenes: req.body.imagenes,
        activo: req.body.activo
    });
    try {
        const nuevoAlojamiento = await alojamiento.save();
        res.status(201).json(nuevoAlojamiento);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar un alojamiento existente por ID
router.put('/:id', async (req, res) => {
    try {
        const alojamiento = await Alojamiento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(alojamiento);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un alojamiento por ID
router.delete('/:id', async (req, res) => {
    try {
        const alojamiento = await Alojamiento.findByIdAndDelete(req.params.id);
        if (!alojamiento) return res.status(404).json({ message: 'Alojamiento no encontrado' });
        res.json({ message: 'Alojamiento eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
