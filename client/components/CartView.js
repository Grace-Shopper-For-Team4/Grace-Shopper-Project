import React from 'react'
import {Grid, Row, Col, Button, Label} from 'react-bootstrap'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchCart, removeProductFromCart, addProductToCart} from '../store'
import EmptyCart from './EmptyCart'
import QuantityForm from './QuantityForm'
import StripeForm from './StripeForm'

const CartView = props => {
  return props.cart.length ? (
    <Grid>
      <Row>
        {props.cart.map(product => (
          <Col key={product.id} md={4}>
            <Row id="single-item">
              <Col md={5} id="imageDiv">
                <img
                  width="100%"
                  height="150px"
                  src={product.imageUrl}
                  alt="image"
                />
              </Col>
              <Col md={7}>
                <h4>{product.name}</h4>
                <p>Unit Price: ${product.price}</p>
                {<QuantityForm product={product} />}
                {/* <p>Quantity:{product.quantity || 1}</p> */}
                {/* pass in product id, and either cur logged in user id or null */}
                <div id="removeButton">
                  <Button
                    type="button"
                    bsStyle="danger"
                    bsSize="xsmall"
                    onClick={() =>
                      props.removeProductFromCart(product.id, props.userId || 0)
                    }
                  >
                    Remove Item
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
      <Row>
        <Col md={6}>
          <h2>
            <Label bsStyle="warning">Current Total: ${props.totalPrice}</Label>
          </h2>
        </Col>

        <Col md={6}>
          <Button
            className="pull-right"
            type="button"
            bsStyle="success"
            bsSize="large"
          >
            Checkout!
          </Button>
          <StripeForm />
        </Col>
      </Row>
    </Grid>
  ) : (
    <EmptyCart />
  )
}

const mapStateToProps = state => ({
  cart: state.cartReducer.cart,
  totalPrice: state.cartReducer.totalPrice,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  fetchCart: id => dispatch(fetchCart(id)),
  removeProductFromCart: (productId, userId) =>
    dispatch(removeProductFromCart(productId, userId)),
  addProductToCart: (productId, userId) =>
    dispatch(addProductToCart(productId, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartView)
