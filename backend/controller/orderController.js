import asyncHandler from "express-async-handler";
import Order from '../models/orderModel.js';



// @des Fetch all order
// @route post /api/products
// @addess private
 export const addOrderItem = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }



})


// @des get order by id
// @route get /api/order by id
// @addess private
 export const getOrder = asyncHandler(async (req, res) => {
    
    const order =await Order.find({})
    if(order){
        res.json(order)

    }
    else{
        res.status(404)
        throw new Error('order not found')
    }


})
 export const getOrderById = asyncHandler(async (req, res) => {
    
    const order =await Order.findById(req.params.id).populate('user','name')
    if(order){
        res.json(order)

    }
    else{
        res.status(404)
        throw new Error('order not found')
    }


})


// @desc    Update order to delivered
// @route   put /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()
  
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
  