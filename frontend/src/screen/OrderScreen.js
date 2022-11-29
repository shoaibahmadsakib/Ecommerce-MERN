import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loading'
import {
    getOrderDetails,
    deliverOrder

} from '../actions/orderAction'
import Loading from '../components/Loading'
import { ORDER_DELIVER_RESET } from "../constants/orderConstant"


const OrderScreen = ({ match, history }) => {

    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails


    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver


    if (!loading) {

        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }



    useEffect(() => {
        if(successDeliver){
            dispatch({type: ORDER_DELIVER_RESET})
        }
        dispatch(getOrderDetails(orderId))

    }, [dispatch, orderId , ])

    const deleverHandler = (e) => {
      dispatch(deliverOrder(order))
    }
    return loading ? <Loader /> : error ? <Message variant='danger'>
        {error}
    </Message> : <>

        <h1>Order {order._id}</h1>

        <Row>

            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}
                            {order.shippingAddress.postalCode},
                            {order.shippingAddress.country}
                            {order.isDelivered ? <Message variant='success'>{order.isPaid}</Message> : <Message variant='danger'>not shipping</Message>}
                        </p>
                        <p><strong>name:</strong>{order.user.name}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                        {order.isPaid ? <Message variant='success'>{order.isPaid}</Message> : <Message variant='danger'>not paid</Message>}
                    </ListGroup.Item>


                    <ListGroup.Item>
                        <h2>Order Item</h2>
                        {order.orderItems?.length === 0 ? <Message>Your order is empty</Message> :
                            <ListGroup>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty}x{item.price}  =  ${parseFloat(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>

                                    </ListGroup.Item>
                                ))}

                            </ListGroup>
                        }
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>

                        </ListGroup.Item>


                        <ListGroup.Item>
                            <Button type='button' className='btn btn-block'
                                onClick={deleverHandler}>
                                Make As Delever
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}

export default OrderScreen