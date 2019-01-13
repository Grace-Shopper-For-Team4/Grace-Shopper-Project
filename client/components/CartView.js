import React from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchCart, removeProductFromCart, addProductToCart} from '../store'

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
                <p>Quantity: {product.quantity}</p>
                <p>Unit Price: ${product.price}</p>
                {/* pass in product id, and either cur logged in user id or null */}
                <Button
                  type="button"
                  bsStyle="danger"
                  onClick={() =>
                    props.removeProductFromCart(product.id, props.userId || 0)
                  }
                >
                  Remove Item
                </Button>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
      <Button type="button" bsStyle="success">
        Checkout!
      </Button>
    </Grid>
  ) : (
    <div>
      <div>No Products Currently In Cart</div>
      <Button type="button" bsStyle="info" href="/products">
        Back to All Product
      </Button>
    </div>
  )
}

const mapStateToProps = state => ({
  cart: state.cartReducer.cart,
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
