import express from 'express'
const router = express.Router()
import { addOrderItem, getOrder, getOrderById, updateOrderToDelivered } from '../controller/orderController.js'
import { admin, protect } from '../middleware/authMiddlewere.js'


// @des Fetch all products
// @route get /api/products
// @addess Public
router.route('/').post(protect, addOrderItem).get(protect, getOrder)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/deliver').put( updateOrderToDelivered)


export default router