// controllers/menu.controller.js
import Producto from '../models/producto.model.js';

// Obtener todos los productos del menú
export const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos del menú." });
    }
};

// Agregar un producto al menú

export const agregarAlMenu = async (req, res) => {
    const { titulo, precio, stock, imagen } = req.body;

    if (!titulo || !precio || !stock) {
        return res.status(400).json({ message: "Faltan datos para agregar el producto al menú." });
    }

    try {
        // Crear un nuevo objeto Producto con la imagen incluida
        const nuevoProducto = new Producto({
            titulo,
            precio,
            stock,
            imagen // Agregamos el campo imagen
        });

        // Guardar el producto en la base de datos
        await nuevoProducto.save();

        // Responder con el producto agregado
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar el producto al menú." });
    }
};



// Eliminar un producto del menú
export const eliminarDelMenu = async (req, res) => {
    const { titulo } = req.body;

    if (!titulo) {
        return res.status(400).json({ message: "Se requiere el título del producto." });
    }

    try {
        // Buscar y eliminar el producto por su título
        const productoEliminado = await Producto.findOneAndDelete({ titulo });

        if (!productoEliminado) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        res.json({ message: `Producto ${titulo} eliminado del menú.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el producto del menú." });
    }
};


// Actualizar la cantidad de un producto en el menú
export const actualizarCantidadMenu = async (req, res) => {
    const { titulo, cantidad } = req.body;

    if (!titulo || !cantidad) {
        return res.status(400).json({ message: "Faltan datos para actualizar la cantidad en el menú." });
    }

    try {
        
        res.json({ message: `Cantidad de ${titulo} en el menú actualizada a ${cantidad}.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la cantidad en el menú." });
    }
};




