import mongoose from 'mongoose';

const compraSchema = new mongoose.Schema({
  nombreCliente: {  //nombre del cliente que hizo la compra
    type: String,  //cadena de texto 
    required: true,  //este campo es obligatorio
  },
  productos: [{  //aqui vamos a guardar los productos de la compra
    nombre: String,  //el nombre de cada producto
    cantidad: Number,  //la cantidad de ese producto que se compro
    precio: Number,  //el precio del producto
  }],
  fecha: {  //la fecha de la compra
    type: Date,  //el tipo de dato es una fecha
    default: Date.now,  // si no se pasa una fecha, se usa la fecha actual por defecto
  },
  total: {  //el valor final de la compra
    type: Number,  // es un numero
    required: true,  //obligatorio
  }
});

//se crea el modelo de la compra 
const Compra = mongoose.model('Compra', compraSchema);  //creando un modelo llamado "Compra"

export default Compra; 