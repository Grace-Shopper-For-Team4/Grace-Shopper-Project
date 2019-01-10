import React from 'react'
import {connect} from 'react-redux'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import ErrorPage from '../errorPage'

const SingleProduct = props => {
  const id = props.match.params.id
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
          <p>Available Quantity:{product.quantity}</p>
          <h3>Price: ${product.price}</h3>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="pull-right">
          <Button type="button" bsStyle="info" href="/products">
            Back to All Product
          </Button>
          <Button className="pull-right" type="button" bsStyle="primary">
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
  products: state.productsReducer.products
})

export default connect(mapStateToProps)(SingleProduct)
