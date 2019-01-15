import React from 'react'
import {SplitButton, Button, MenuItem, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {updateCart} from '../store'

class QuantityForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      updateQuantity: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange = event => {
    this.setState({
      updateQuantity: event
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const {userId, product, updateCart} = this.props
    console.log(userId, product, this.state.updateQuantity)
    updateCart(this.state.updateQuantity, product, userId)
  }

  render() {
    return (
      <div className="quantityForm">
        <p id="currentQuant">Current Quantity:{this.props.product.quantity}</p>
        <Row>
          <Col md={6} style={{padding: 0}}>
            <SplitButton
              bsSize="xsmall"
              title={this.state.updateQuantity}
              id="quantity"
              onSelect={this.handleChange}
            >
              <MenuItem eventKey="1">1</MenuItem>
              <MenuItem eventKey="2">2</MenuItem>
              <MenuItem eventKey="3">3</MenuItem>
              <MenuItem eventKey="4">4</MenuItem>
              <MenuItem eventKey="5">5</MenuItem>
            </SplitButton>
          </Col>
          <Col md={6}>
            <Button
              type="button"
              bsStyle="info"
              bsSize="xsmall"
              id="updateButton"
              onClick={this.handleSubmit}
            >
              Update Qty.
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cartReducer.cart,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  updateCart: (quantity, product, id) =>
    dispatch(updateCart(quantity, product, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuantityForm)
