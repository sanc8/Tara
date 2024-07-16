const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); // Asegúrate de que la ruta al modelo es correcta
const usersController = require('../controllers/usersController'); // Ajusta la ruta si es necesario

// Obtener todos los usuarios utilizando el método en el controlador
router.get('/', usersController.getAllUsers);

// Obtener un usuario específico por ID
router.get('/:id', usersController.getUserById);

// Crear un nuevo usuario
router.post('/', usersController.createUser);

// Actualizar un usuario por ID
router.put('/:id', usersController.updateUser);

// Eliminar un usuario por ID
router.delete('/:id', usersController.deleteUser);

module.exports = router;
