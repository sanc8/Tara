const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');

// Obtener todas las reservas
router.get('/', async (req, res) => {
    try {
        const reservas = await Reserva.find().populate('usuario alojamiento evento');
        res.json(reservas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener una reserva específica por ID
router.get('/:id', async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id).populate('usuario alojamiento evento');
        if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
        res.json(reserva);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear una nueva reserva
router.post('/', async (req, res) => {
    const reserva = new Reserva({
        usuario: req.body.usuario,
        alojamiento: req.body.alojamiento,
        evento: req.body.evento,
        fechaInicio: req.body.fechaInicio,
        fechaFin: req.body.fechaFin,
        precioTotal: req.body.precioTotal,
        tipoReserva: req.body.tipoReserva
    });
    try {
        const nuevaReserva = await reserva.save();
        res.status(201).json(nuevaReserva);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar una reserva existente por ID
router.put('/:id', async (req, res) => {
    try {
        const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(reserva);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar una reserva por ID
router.delete('/:id', async (req, res) => {
    try {
        const reserva = await Reserva.findByIdAndDelete(req.params.id);
        if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
        res.json({ message: 'Reserva eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
