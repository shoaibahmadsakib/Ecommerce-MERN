
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { register } from '../actions/userActions'
import Message from '../components/Message'
import Loading from '../components/Loading'



const RegisterScreen = ({ location , history}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [name, setName] = useState('')


    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)

    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'



    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("password do not match")
        } else {

            dispatch(register(name, email, password))
        }
    }
    return (
        <FormContainer>
            <h1>Sign up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loading />}

            <Form onSubmit={submitHandler} >

                <Form.Group controlId='name'>
                    <Form.Label>enter name</Form.Label>
                    <Form.Control type='name' placeholder='enter name' value={name} onChange={(e) => setName(e.target.value)} ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='enrtr email' value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>enter password</Form.Label>
                    <Form.Control type='password' placeholder='enrtr password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>confirm password</Form.Label>
                    <Form.Control type='password' placeholder='enrtr confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Register</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    here login
                    <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
                        login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen