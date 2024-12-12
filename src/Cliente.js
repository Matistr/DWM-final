const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nombreCompleto: { type: String, required: true },
    direccion: { type: String },
    comuna: { type: String },
    region: { type: String },
    correoElectronico: { type: String, required: true },
    telefono: { type: String }
});

module.exports = mongoose.model('Cliente', clienteSchema);
