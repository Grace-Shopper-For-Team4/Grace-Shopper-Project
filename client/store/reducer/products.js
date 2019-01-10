import axios from 'axios'

const GOT_PRODUCTS_FROM_SERVER = 'GOT_PRODUCTS_FROM_SERVER'

export const gotProductsFromServer = products => ({
  type: GOT_PRODUCTS_FROM_SERVER,
  products
})

// export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

// export const getSingleProduct = product => ({
//   type: GET_SINGLE_PRODUCT,
//   product
// })

export const getProductsFromServer = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/products`)
      const action = gotProductsFromServer(res.data)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

// export const getSingleProductFromServer = productId => {
//   return async dispatch => {
//     try {
//       const res = await axios.get(`api/products/${productId}`)
//       const action = gotSingleProductFromServer(res.data)
//       dispatch(action)
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

const initialState = {
  // selectedProduct: {},
  products: []
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCTS_FROM_SERVER:
      return {...state, products: action.products}
    // case GET_SINGLE_PRODUCT:
    //   return {...state, selectedProduct: action.product}
    default:
      return state
  }
}

export default productReducer
