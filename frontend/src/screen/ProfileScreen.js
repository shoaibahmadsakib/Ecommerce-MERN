
import { Button, Col, Form, Row } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserDetails ,getUserUpdateProfile } from '../actions/userActions'
import Message from '../components/Message'
import Loading from '../components/Loading'



const ProfileScreen = ({ history ,location }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [name, setName] = useState('')


    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const redirect = location.search ? location.search.split('=')[1] : '/'



    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        else{
            if(!user?.name || !user){
                dispatch(getUserDetails('profile'))
            }
            else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo,user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("password do not match")
        } else {

            dispatch(getUserUpdateProfile({ id: user._id , name ,email ,password}))
        }
    }
    return (
        <Row>
            <Col md={3}>

                <h1>profile</h1>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {success && <Message variant="success">update successfully</Message>}
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

                    <Button type='submit' variant='primary'>update</Button>
                </Form>



            </Col>
            <Col md={9}>
              <h2>my order</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen