import React from 'react'
import {connect} from 'react-redux'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import ErrorPage from './ErrorPage'
import {addProductToCart} from '../store/reducer/cart'
import {NavLink} from 'react-router-dom'

const SingleProduct = props => {
  const id = props.match.params.id
  const addProductToCart = props.addProductToCart
  const product = props.products.filter(item => item.id == id)[0]
  return product ? (
    <Grid>
      <Row>
        <Col md={6}>
          <img
            id="productImage"
            src={product.imageUrl}
            alt="image"
            width="350"
            height="350"
          />
        </Col>
        <Col md={6}>
          <h1 id="productName">{product.name}</h1>
          <hr />
          <p>Description :{product.description} </p>
          <p>Available Quantity: {product.stockQuantity}</p>
          <h3>Price: $ {product.price}</h3>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="pull-right">
          <NavLink to="/products">
            <Button type="button" bsStyle="info">
              Back to All Product
            </Button>
          </NavLink>
          {props.cart.some(item => item.id === product.id) ? (
            <NavLink to="/cart">
              <Button bsStyle="warning" className="pull-right">
                Change Quantity
              </Button>
            </NavLink>
          ) : (
            <Button
              type="button"
              bsStyle="success"
              className="pull-right"
              onClick={() => addProductToCart(product, props.userId || 0)}
            >
              Add To Cart
            </Button>
          )}
        </Col>
      </Row>
    </Grid>
  ) : (
    <ErrorPage />
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
