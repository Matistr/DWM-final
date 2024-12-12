const Cliente = require('../models/Cliente');

exports.listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar clientes' });
    }
};
exports.crearCliente = async (req, res) => {
    try {
        const cliente = new Cliente(req.body);
        await cliente.save();
        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear cliente' });
    }
};
exports.obtenerCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener cliente' });
    }
};
exports.actualizarCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar cliente' });
    }
};
exports.eliminarCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar cliente' });
    }
};