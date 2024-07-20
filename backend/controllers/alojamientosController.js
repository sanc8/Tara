const Alojamiento = require('../models/Alojamiento');

// Obtener todos los alojamientos
exports.getAllAlojamientos = async (req, res) => {
    try {
        const alojamientos = await Alojamiento.find();
        res.json(alojamientos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un alojamiento por ID
exports.getAlojamientoById = async (req, res) => {
    try {
        const alojamiento = await Alojamiento.findById(req.params.id);
        if (alojamiento) {
            res.json(alojamiento);
        } else {
            res.status(404).json({ message: "Alojamiento no encontrado" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo alojamiento
exports.createAlojamiento = async (req, res) => {
    const alojamiento = new Alojamiento({
        nombre: req.body.nombre,
        ubicacion: req.body.ubicacion,
        precio: req.body.precio
    });

    try {
        const newAlojamiento = await alojamiento.save();
        res.status(201).json(newAlojamiento);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Actualizar un alojamiento por ID
exports.updateAlojamiento = async (req, res) => {
    try {
        const updatedAlojamiento = await Alojamiento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAlojamiento);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar un alojamiento por ID
exports.deleteAlojamiento = async (req, res) => {
    try {
        const alojamiento = await Alojamiento.findByIdAndDelete(req.params.id);
        if (alojamiento) {
            res.json({ message: 'Alojamiento eliminado' });
        } else {
            res.status(404).json({ message: 'Alojamiento no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
