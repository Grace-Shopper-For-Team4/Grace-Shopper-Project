import React from 'react'
import {SplitButton, Button, MenuItem, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {updateTotalPrice} from '../store/'

class QuantityForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuantity: 1,
      productId: this.props.product.id,
      updateQuantity: 0,
      productTotalPrice: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange = event => {
    console.log(event)
    this.setState({
      updateQuantity: event,
      totalprice: this.props.product.price * event
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.updateTotalPrice(this.state.totalprice)
    console.log(this.state.totalprice, this.props.product)
  }

  render() {
    console.log(this.props)
    return (
      <div className="quantityForm">
        <p id="currentQuant">Current Quantity:{this.state.currentQuantity}</p>
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
  totalprice: state.cartReducer.cart.totalprice,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  updateTotalPrice: productTotal => dispatch(updateTotalPrice(productTotal))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuantityForm)
