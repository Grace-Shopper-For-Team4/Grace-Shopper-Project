import React from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchUserCart} from '../store/reducer/cart'

class CartView extends React.Component {
  componentDidMount() {
    console.log(this.props, 'props')
    if (this.props.userId) {
      this.props.fetchUserCart(this.props.userId)
    }
  }
  componentDidUpdate() {
    if (this.props.userId && !this.props.cart.length) {
      this.props.fetchUserCart(this.props.userId)
    }
  }

  render() {
    return this.props.cart ? (
      <Grid>
        <Row>
          {this.props.cart.map(elem => (
            <Col key={elem.product.id} md={4}>
              <Row id="single-item">
                <Col md={5} id="imageDiv">
                  <img
                    width="100%"
                    height="150px"
                    src={elem.product.imageUrl}
                    alt="image"
                  />
                </Col>
                <Col md={7}>
                  <h4>{elem.product.name}</h4>
                  <p>Quantity: {elem.product.quantity}</p>
                  <p>Unit Price: ${elem.product.price}</p>
                  <Button type="button" bsStyle="danger">
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
      <div>No Cart</div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cartReducer.cart,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  fetchUserCart: id => dispatch(fetchUserCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartView)
