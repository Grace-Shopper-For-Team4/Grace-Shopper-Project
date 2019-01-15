import React from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {addProductToCart} from '../store'

const Products = props => {
  const {products, addProductToCart, cart} = props

  return (
    <Grid>
      <Row>
        {products.map(product => (
          <Col key={product.id} md={4}>
            <Row id="single-item">
              <Col md={5} id="imageDiv">
                <NavLink to={`/products/${product.id}`}>
                  <img
                    width="100%"
                    height="150px"
                    src={product.imageUrl}
                    alt="image"
                  />
                </NavLink>
              </Col>
              <Col md={7}>
                <NavLink to={`/products/${product.id}`}>
                  <h4>{product.name}</h4>
                </NavLink>
                <p>Quantity: {product.stockQuantity}</p>
                <p>Unit Price: ${product.price}</p>
                {cart.some(item => item.id === product.id) ? (
                  <NavLink to="/cart">
                    <Button bsStyle="warning">Change Quantity</Button>
                  </NavLink>
                ) : (
                  <Button
                    type="button"
                    bsStyle="success"
                    onClick={() => addProductToCart(product, props.userId || 0)}
                  >
                    Add To Cart
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </Grid>
  )
}

const mapStateToProps = state => ({
  products: state.productsReducer.products,
  userId: state.user.id,
  cart: state.cartReducer.cart
})

const mapDispatchToProps = dispatch => ({
  addProductToCart: (product, userId) =>
    dispatch(addProductToCart(product, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
