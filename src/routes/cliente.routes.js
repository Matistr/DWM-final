const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listarClientes);

router.get('/:id', clienteController.obtenerCliente);

router.post('/', clienteController.crearCliente);

router.put('/:id', clienteController.actualizarCliente);

router.delete('/:id', clienteController.eliminarCliente);

module.exports = router;