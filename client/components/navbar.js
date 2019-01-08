import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Nav, Navbar, NavItem} from 'react-bootstrap'

const NavigationBar = ({handleClick, isLoggedIn}) => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Fancy Rock Shop</a>
      </Navbar.Brand>
    </Navbar.Header>

    <Nav>
      <NavItem eventKey={1} href="/products">
        AllProduct
      </NavItem>
      <NavItem eventKey={2} href="/type1">
        type1
      </NavItem>
      <NavItem eventKey={3} href="/type2">
        type2
      </NavItem>
      <NavItem eventKey={4} href="/type3">
        type3
      </NavItem>
    </Nav>

    {isLoggedIn ? (
      <Nav pullRight>
        {/* The navbar will show these links after you log in */}
        <NavItem eventKey={1} to="/">
          AllProduct
        </NavItem>
        <NavItem onClick={handleClick} eventKey={2} href="#">
          Logout
        </NavItem>
      </Nav>
    ) : (
      <Nav pullRight>
        {/* The navbar will show these links before you log in */}
        <NavItem eventKey={1} href="/login">
          Login
        </NavItem>
        <NavItem eventKey={2} href="/signup">
          Sign Up
        </NavItem>
      </Nav>
    )}
  </Navbar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavigationBar)

/**
 * PROP TYPES
 */
NavigationBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
