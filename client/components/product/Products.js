import React from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {connect} from 'react-redux'

const Products = props => {
  const allProducts = props.products
  const type = props.match.params.type
  const products = type
    ? allProducts.filter(product => product.type === type)
    : allProducts

  return (
    <Grid>
      <Row>
        {products.map(product => (
          <Col key={product.id} md={4}>
            <Row id="single-item">
              <Col md={5} id="imageDiv">
                <img
                  width="100%"
                  height="100%"
                  src={product.imageUrl}
                  alt="image"
                />
              </Col>
              <Col md={7}>
                <h4>{product.name}</h4>
                <p>Quantity: {product.quantity}</p>
                <p>Unit Price: ${product.price}</p>
                <Button type="button" bsStyle="success">
                  Add To Cart
                </Button>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </Grid>
  )
}

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps)(Products)
