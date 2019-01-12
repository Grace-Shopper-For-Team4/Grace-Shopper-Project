import React from 'react'
import {connect} from 'react-redux'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import ErrorPage from '../errorPage'
import {addProductToCart} from '../../store/reducer/cart'

const SingleProduct = props => {
  const id = props.match.params.id
  const addProductToCart = props.addProductToCart
  const product = props.products.filter(item => item.id == id)[0]
  console.log(props)
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
          <Button type="button" bsStyle="info" href="/products">
            Back to All Product
          </Button>
          <Button
            className="pull-right"
            type="button"
            bsStyle="primary"
            onClick={() => addProductToCart(product, props.userId || 0)}
          >
            Add To Cart
          </Button>
        </Col>
      </Row>
    </Grid>
  ) : (
    <ErrorPage />
  )
}

const mapStateToProps = state => ({
  products: state.productsReducer.products,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  addProductToCart: (product, userId) =>
    dispatch(addProductToCart(product, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
