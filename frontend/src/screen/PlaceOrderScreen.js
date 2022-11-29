import React from 'react'
import { Form, Button, Row, Col, ListGroup, Card, Image } from 'react-bootstrap'

import CheckoutStapes from '../components/CheckoutStapes'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { createOrder } from "../actions/orderAction"
import { useEffect } from 'react'

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 10 : 60)
    cart.taxPrice = addDecimals(Number(.05 * cart.itemsPrice).toFixed(2))

    cart.totalPrice = addDecimals(Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice))


    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
    }, [history, success])
    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,

        }))

    }
    return (
        <>
            <CheckoutStapes step1 step2 step3 step4 />
            <Row>

                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {cart.shippingAddress.postalCode},
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Item</h2>
                            {cart.cartItems?.length === 0 ? <Message>Your cart is empty</Message> :
                                <ListGroup>
                                    {cart.cartItems.map((item, index) => (
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
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>

                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger' >{error}</Message>}

                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen