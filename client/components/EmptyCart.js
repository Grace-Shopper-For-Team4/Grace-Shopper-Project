import React from 'react'
import {Button, Panel} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div>
      <div className="emptyCart">
        <Panel bsStyle="danger">
          <Panel.Heading style={{textAlign: 'center'}}>
            <Panel.Title componentClass="h3">
              No Products Currently In Cart
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <img
              style={{
                width: '35%',
                height: '20%'
              }}
              src="https://images.unsplash.com/photo-1516355161757-eed94aecaeab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
              alt=""
            />
            <NavLink to="/products">
              <Button className="pull-right" type="button" bsStyle="info">
                Back to All Product
              </Button>
            </NavLink>
          </Panel.Body>
        </Panel>
      </div>
    </div>
  )
}

export default EmptyCart
