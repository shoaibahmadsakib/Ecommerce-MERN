import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Link } from "react-router-dom"

import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productAction'
import Loading from '../components/Loading'
import Message from '../components/Message'
import Meta from '../components/Meta'

// import products from '../products'

const ProductScreen = ({ history, match }) => {



    const [qty, setQty] = useState(1)
    // const [product,setProduct ]=useState({})
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails


    useEffect(() => {

        dispatch(listProductDetails(match.params.id))

    }, [dispatch])


    const addTocartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <>
            <Meta title={product.name} />
            <Link className='btn btn-light my-3' to="/">GO back</Link>
            {
                loading ? <Loading /> : error ? <Message variant="danger">{error}</Message> :
                    <Row>
                        <Col md={6} sm={12}>
                            <Image src={product.image} alt="" width="100%" />
                        </Col>
                        <Col md={3} sm={12}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews}`} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price :${product.price}

                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Describtion :{product.description}

                                </ListGroup.Item>
                            </ListGroup>

                        </Col>
                        <Col md={3} sm={12}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price: </Col>
                                            <Col>

                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status: </Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'in Stock' : "Out of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {
                                        product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Status:
                                                    </Col>
                                                    <Col>
                                                        <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                            {[...Array(product.countInStock).keys()].map(x => (
                                                                <option value={x + 1} key={x + 1}>{x + 1}</option>
                                                            ))}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    }
                                    <ListGroup.Item>
                                        <Button onClick={addTocartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>Add to Cart</  Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
            }
        </>

    )
}

export default ProductScreen