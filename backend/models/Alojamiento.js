const mongoose = require('mongoose');

const alojamientoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    caracteristicas: [String],
    capacidad: { type: Number, required: true },
    imagenes: [String],
    activo: { type: Boolean, default: true }
});

module.exports = mongoose.model('Alojamiento', alojamientoSchema);
