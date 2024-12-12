import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    cantidad: {
        type: Number,
        default: 1,
        min: 1
    },
    imagen: {
        type: String, // Esto almacenará la URL de la imagen
        required: false 
    }

}, {
    timestamps: true
});

export default mongoose.model('Producto', productoSchema);

