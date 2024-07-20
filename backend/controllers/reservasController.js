// controllers/reservasController.js
const Reserva = require('../models/Reserva');

exports.getAllReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReservaById = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (reserva) {
      res.json(reserva);
    } else {
      res.status(404).json({ message: "Reserva no encontrada" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createReserva = async (req, res) => {
  const reserva = new Reserva({
    usuarioId: req.body.usuarioId,
    alojamientoId: req.body.alojamientoId,
    fechaInicio: req.body.fechaInicio,
    fechaFin: req.body.fechaFin,
  });

  try {
    const newReserva = await reserva.save();
    res.status(201).json(newReserva);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateReserva = async (req, res) => {
  try {
    const updatedReserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedReserva);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (reserva) {
      res.json({ message: 'Reserva eliminada' });
    } else {
      res.status(404).json({ message: 'Reserva no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






