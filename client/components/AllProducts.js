import React from 'react'
import {Grid, Row, Col, ProgressBar, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getProductsFromServer} from '../reducer/productsReducer'
class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    return this.props.products ? (
      <Grid>
        <Row>
          {this.props.products.map(product => (
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
    ) : (
      <ProgressBar active now={60} />
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(getProductsFromServer())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
