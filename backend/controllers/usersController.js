const User = require('../models/Usuario'); // Asegúrate de que la ruta al modelo es correcta

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    const user = new User({
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password, // Considera usar hashing para la contraseña
        rol: req.body.rol
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
