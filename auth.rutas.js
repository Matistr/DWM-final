import { Router } from "express";
import { actualizaUser, login, register, logout, perfil } from '../controladores/auth.controladores.js'
import { authrequired } from "../middlewares/validarToken.js"

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.put('/actualizar/:id', actualizaUser)
router.get('/perfil', authrequired, perfil)

export default router
