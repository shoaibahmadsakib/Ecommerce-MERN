import React, { useEffect } from 'react'
import { Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromItem } from '../actions/cartAction';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'




const CartScreen = ({ match, location, history }) => {



  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart


  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])


  const removeFromCarthandler = (productId) => {
    dispatch(removeFromItem(productId))
  }
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>
        {cartItems.length === 0 ? <Message>your cart is empty  <Link to="/">go to back</Link> </Message> :
          (
            <ListGroup variant='flush'>
              {
                cartItems.map(item => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.name}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>
                        $ {item.price}
                      </Col>
                      <Col md={2}>
                        <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                          {[...Array(item.countInStock).keys()].map(x => (
                            <option value={x + 1} key={x + 1}>{x + 1}</option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button type='button' variant='light' onClick={() => removeFromCarthandler(item.product)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
          )
        }
      </Col>
      <Col md={4}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Sub total ({cartItems.reduce((previous, current) => previous + current.qty, 0)})</h2>
            $({cartItems.reduce((previous, current) => previous + current.qty * current.price, 0).toFixed(2)})
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type='button'
              variant='dark'
              disabled={cartItems.length == 0}
              onClick={checkoutHandler}>
              check out proceed
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  )
}

export default CartScreen