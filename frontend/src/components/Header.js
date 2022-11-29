
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';
import { Route } from "react-router-dom"

const Header = () => {

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout());
  }
  return (
    <div>
      <Navbar bg="dark" expand="lg" collapseOnSelect variant="dark">
        <Container >
          <LinkContainer to="/">
            <Navbar.Brand href="/">Pro shop</Navbar.Brand>

          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />

          <Route render={({ history }) => <SearchBox history={history} />} />
          <Navbar.Collapse id="basic-navbar-nav ">

            <Nav
              className="ml-auto" style={{ marginLeft: 'auto' }}

            >

              <LinkContainer to="/cart/:id">

                <Nav.Link ><i className='fas fa-shopping-cart'></i> cart</Nav.Link>
              </LinkContainer>
              {
                userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                  </NavDropdown>
                ) :
                  <LinkContainer to="/login">
                    <Nav.Link> <i className='fas fa-user'></i> Login</Nav.Link>

                  </LinkContainer>
              }

              {
                userInfo && userInfo.isAdmin && (
                  <NavDropdown title="admin" id="adminManu">
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders">
                      <NavDropdown.Item>order</NavDropdown.Item>
                    </LinkContainer>



                  </NavDropdown>
                )
              }


            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>




    </div>
  )
}

export default Header