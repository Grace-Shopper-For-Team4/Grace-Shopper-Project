import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default class StripeForm extends React.Component {
  onToken = (token, addresses) => {}

  render() {
    return (
      <StripeCheckout
        amount="1000000"
        description="Awesome Rocks"
        stripeKey="pk_test_Ps7GXSZMMU81uSBuRuvqnxZo"
        label="Purchase your rocks here with a Credit Card"
        token={this.onToken}
      />
    )
  }
}
