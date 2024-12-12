import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'producto', // Relacionamos con la colección de productos
      required: true,
    },
    cantidad: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Carrito', carritoSchema);
