
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserDetails, register, updateUser } from '../actions/userActions'
import Message from '../components/Message'
import Loading from '../components/Loading'

import { USER_DELETE_REQUEST, USER_DETAILS_REQUEST, USER_UPDATE_RESET } from "../constants/userConstant"



const UserEditScreen = ({ location, history, match }) => {

    const userId = match.params.id

    const [email, setEmail] = useState('');
    const [isAdmin, setIsadmin] = useState(false)

    const [name, setName] = useState('')


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)

    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)

    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    // const redirect = location.search ? location.search.split('=')[1] : '/'



    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
          } else {
            if (!user.name || user._id !== userId) {
              dispatch(getUserDetails(userId))
            } else {
              setName(user.name)
              setEmail(user.email)
              setIsadmin(user.isAdmin)
            }
          }



    }, [user, dispatch, userId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))

    }
    return (
        <>

            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loading />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isadmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsadmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default UserEditScreen