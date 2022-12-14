import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import loading from '../components/Loading'
// import message from '../components/Message'
import { login } from '../actions/userActions'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({location ,history, params}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')


    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { loading, error, userInfo } = userLogin

  
    const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo,redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='enrtr email' value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='password' placeholder='enrtr password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Sign in</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen