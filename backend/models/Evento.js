const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, required: true },
    capacidadMaxima: { type: Number, required: true },
    costo: { type: Number, required: true },
    tipoEvento: { type: String, required: true, enum: ['Taller', 'Comida temática'] }
});

module.exports = mongoose.model('Evento', eventoSchema);
