import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Nav, Navbar, NavItem, Glyphicon} from 'react-bootstrap'
import User from './user-home'

const NavigationBar = ({handleClick, isLoggedIn, totalQuantity}) => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Fancy Rock Shop</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/products">
          All Product
        </NavItem>
        {/* <NavItem eventKey={2} href="/products?type=igneos">
          igneos
        </NavItem>
        <NavItem eventKey={3} href="/products/metamorphasis">
          metamorphasis
        </NavItem>
        <NavItem eventKey={4} href="/products/sedimentary">
          sedimentary
        </NavItem>
        <NavItem eventKey={5} href="/products/rock">
          rock
        </NavItem> */}
      </Nav>

      <Nav pullRight>
        <NavItem eventKey={4} href="/cart">
          <Glyphicon glyph="shopping-cart" />{' '}
          <span className="quantity">{totalQuantity}</span>
        </NavItem>
      </Nav>

      {isLoggedIn ? (
        <Nav pullRight>
          {/* The navbar will show these links after you log in */}
          <NavItem eventKey={1} to="/products">
            <User />
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
    </Navbar.Collapse>
  </Navbar>
)

/**
 * CONTAINER
 */
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
