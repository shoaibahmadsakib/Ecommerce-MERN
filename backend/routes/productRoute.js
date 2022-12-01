import express from 'express'
const router = express.Router()
import { createProduct, deleteProducts, getProductById, getProducts, getTopProducts, updateProduct } from '../controller/productController.js'
import { protect, admin } from '../middleware/authMiddlewere.js'


router.get('/', getProducts)
router.post('/', protect,admin,createProduct)
router.put('/:id', updateProduct)
router.get('/top', getTopProducts)
router.get('/:id', getProductById)
router.delete('/:id', protect, admin, deleteProducts)

export default router