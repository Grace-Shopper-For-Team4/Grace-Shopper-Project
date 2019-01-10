import React from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

const Products = props => {
  const products = props.products

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
  products: state.productsReducer.products
})

export default connect(mapStateToProps, null)(Products)
