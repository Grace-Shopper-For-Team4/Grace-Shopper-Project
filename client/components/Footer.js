import React from 'react'
import {Nav, Navbar, NavItem} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'

const FooterPage = () => {
  return (
    <Navbar fixedBottom>
      <Navbar.Header>
        <Navbar.Brand>
          <NavLink to="/products">
            <a>Fancy Rock Shop </a>
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Text>
          <NavLink to="#">
            <Navbar.Link>Built By Team 4</Navbar.Link>
          </NavLink>
        </Navbar.Text>

        <Navbar.Text pullRight>Have a Rockfull Day</Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default FooterPage
