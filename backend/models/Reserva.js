const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    alojamiento: { type: mongoose.Schema.Types.ObjectId, ref: 'Alojamiento' },
    evento: { type: mongoose.Schema.Types.ObjectId, ref: 'Evento' },
    fechaInicio: { type: Date },
    fechaFin: { type: Date },
    precioTotal: { type: Number, required: true },
    tipoReserva: { type: String, required: true, enum: ['Alojamiento', 'Evento'] }
});

module.exports = mongoose.model('Reserva', reservaSchema);
