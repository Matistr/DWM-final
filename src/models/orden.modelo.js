import mongoose from 'mongoose';

// esquema para los productos
const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
});

const ordenSchema = new mongoose.Schema({
  productos: [productoSchema],
  fechaVenta: { type: Date, default: Date.now },
  total: { type: Number, required: true },
  estado: { 
    type: String, 
    enum: ['pendiente', 'en proceso', 'finalizada', 'cancelada'], 
    default: 'pendiente' 
  },
}, { timestamps: true });

// Middleware para calcular el total antes de guardar la orden
ordenSchema.pre('save', function (next) {
  this.total = this.productos.reduce((acc, producto) => {
    return acc + (producto.precio * producto.cantidad);
  }, 0);

  if (this.total === 0) {
    return next(new Error('El total no puede ser cero'));
  }
  next();
});

const Orden = mongoose.model('Orden', ordenSchema);

export default Orden;