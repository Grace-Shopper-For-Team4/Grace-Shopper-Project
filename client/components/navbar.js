import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Nav, Navbar, NavItem, Glyphicon} from 'react-bootstrap'
import User from './UserHomePage'
import {NavLink} from 'react-router-dom'

const NavigationBar = ({handleClick, isLoggedIn, totalQuantity}) => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <NavLink to="/">Fancy Rock Shop</NavLink>
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1}>
          <NavLink to="/products">All Products</NavLink>
        </NavItem>
      </Nav>

      <Nav pullRight>
        <NavItem eventKey={4}>
          <NavLink to="/cart">
            <Glyphicon glyph="shopping-cart" />{' '}
            <span className="quantity">{totalQuantity}</span>
          </NavLink>
        </NavItem>
      </Nav>

      {isLoggedIn ? (
        <Nav pullRight>
          {/* The navbar will show these links after you log in */}
          <NavItem eventKey={1} to="/products">
            <User />
          </NavItem>
          <NavItem onClick={handleClick} eventKey={2}>
            <NavLink to="#">Logout</NavLink>
          </NavItem>
        </Nav>
      ) : (
        <Nav pullRight>
          {/* The navbar will show these links before you log in */}
          <NavItem eventKey={1}>
            <NavLink to="/login">Login</NavLink>
          </NavItem>
          <NavItem eventKey={2}>
            <NavLink to="/signup">Sign Up</NavLink>
          </NavItem>
        </Nav>
      )}
    </Navbar.Collapse>
  </Navbar>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    totalQuantity: state.cartReducer.cart.length
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
