import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import Products from './Products'
import {getProductsFromServer} from '../../reducer/productsReducer'
import ErrorPage from '../errorPage'
import {ProgressBar} from 'react-bootstrap'
/**
 * COMPONENT
 */
class ProductsRoutes extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  // /products/4
  // /products
  // /products?type=igneous
  // /products/type/igneous
  // /products/igneous
  render() {
    const {products} = this.props
    return products ? (
      <Switch>
        <Route exact path="/products" component={Products} />
        <Route
          path="/products/:type"
          render={props => {
            console.log(props)
            console.log(products)
            const type = props.match.params.type
            const exist = products.filter(product => product.type === type)
              .length
            if (exist) {
              return <Products {...props} />
            } else {
              return <ErrorPage />
            }
          }}
        />
      </Switch>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductsRoutes)
)
