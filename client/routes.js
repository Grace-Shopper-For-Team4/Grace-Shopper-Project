import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  CartView,
  ErrorPage,
  HomePage
} from './components'
import {me, getProductsFromServer, fetchCart} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchProducts()
    this.props.fetchCart(this.props.userId || 0)
  }

  componentDidUpdate() {
    this.props.fetchCart(this.props.userId)
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/products" component={AllProducts} />
        <Route path="/cart" component={CartView} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route exact path="/" component={HomePage} />
            <Route component={ErrorPage} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route exact path="/" component={HomePage} />
        <Route component={ErrorPage} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchProducts: () => dispatch(getProductsFromServer()),
    fetchCart: id => dispatch(fetchCart(id))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
