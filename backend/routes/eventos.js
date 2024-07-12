const express = require('express');
const router = express.Router();
const Evento = require('../models/Evento');

// Obtener todos los eventos
router.get('/', async (req, res) => {
    try {
        const eventos = await Evento.find();
        res.json(eventos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener un evento específico por ID
router.get('/:id', async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.id);
        if (!evento) return res.status(404).json({ message: 'Evento no encontrado' });
        res.json(evento);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear un nuevo evento
router.post('/', async (req, res) => {
    const evento = new Evento({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        capacidadMaxima: req.body.capacidadMaxima,
        costo: req.body.costo,
        tipoEvento: req.body.tipoEvento
    });
    try {
        const nuevoEvento = await evento.save();
        res.status(201).json(nuevoEvento);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar un evento existente por ID
router.put('/:id', async (req, res) => {
    try {
        const evento = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(evento);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un evento por ID
router.delete('/:id', async (req, res) => {
    try {
        const evento = await Evento.findByIdAndDelete(req.params.id);
        if (!evento) return res.status(404).json({ message: 'Evento no encontrado' });
        res.json({ message: 'Evento eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
