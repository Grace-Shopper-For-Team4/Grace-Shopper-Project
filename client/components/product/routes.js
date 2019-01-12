import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import Products from './Products'
import {getProductsFromServer} from '../../store/reducer/products'
import ErrorPage from '../errorPage'
import {ProgressBar} from 'react-bootstrap'
import queryString from 'query-string'
import SingleProduct from './SingleProduct'
import {fetchCart} from '../../store/reducer/cart'
/**
 * COMPONENT
 */
class ProductsRoutes extends Component {
  // componentDidMount() {
  //   this.props.fetchProducts()
  // }

  // componentDidUpdate() {
  //   this.props.fetchCart(this.props.userId)
  // }

  render() {
    const {products} = this.props
    return products ? (
      <Switch>
        <Route exact path="/products" component={Products} />
        <Route
          path="/products/:id"
          render={props => {
            const id = props.match.params.id
            const exist = products.filter(product => product.id == id).length
            if (exist) return <SingleProduct {...props} />
            else return <ErrorPage />
          }}
        />
        <Route
          path="/products?type=igneos"
          // render={props => {
          //   console.log(props)
          //   console.log(products)
          //   const type = props.match.params.type
          //   const exist = products.filter(product => product.type === type)
          //     .length
          //   if (exist) {
          //     return <Products {...props} />
          //   } else {
          //     return <ErrorPage />
          //   }
          // }}
        />
      </Switch>
    ) : (
      <ProgressBar active now={60} />
    )
  }
}
const mapStateToProps = state => ({
  products: state.productsReducer.products,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  // fetchProducts: () => dispatch(getProductsFromServer())
  // fetchCart: id => dispatch(fetchCart(id))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductsRoutes)
)
