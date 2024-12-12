import { Router } from 'express'
import {
    getCompras,
    getCompra,
    createCompra,
    deleteCompra,
    updateCompra,
    getComprasDia

} from '../controllers/compra.controller.js'

const router = Router()

router.get('/compras',getCompras)
router.get('/compras/:id',getCompra)
router.get('/dia/hoy',getComprasDia)
router.post('/compras',createCompra)
router.delete('/compras/:id',deleteCompra)
router.put('/compras/:id',updateCompra)

export default router