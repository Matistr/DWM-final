// routes/menu.routes.js
import { Router } from "express";
import { 
    obtenerProductos,
    agregarAlMenu,
    eliminarDelMenu,
    actualizarCantidadMenu
} from "../controllers/auth.controller.js";

const router = Router();

// Ruta para obtener todos los productos del menú
router.get("/menu", obtenerProductos);

// Ruta para agregar un producto al menú
router.post("/menu", agregarAlMenu);

// Ruta para eliminar un producto del menú
router.delete("/menu", eliminarDelMenu);

// Ruta para actualizar la cantidad de un producto en el menú
router.patch("/menu", actualizarCantidadMenu);

export default router;

