import axios from 'axios'
import history from '../../history'

// action type
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
//action creator export const all
export const gotCart = cart => ({type: GOT_CART, cart})
export const addCart = product => ({type: ADD_TO_CART, product})
export const removeCart = productId => ({type: REMOVE_FROM_CART, productId})

// thunk creator
export const fetchCart = id => {
  return async dispatch => {
    let newCart
    try {
      if (!id) {
        newCart = JSON.parse(window.localStorage.getItem('cart'))
        if (!newCart) {
          window.localStorage.setItem('cart', JSON.stringify([]))
          newCart = []
        }
      } else {
        const cart = await axios.get(`/api/users/${id}/cart`)
        newCart = cart.data.map(cartProduct => {
          return {
            ...cartProduct.product,
            quantity: cartProduct.quantity
          }
        })
      }
      dispatch(gotCart(newCart))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addProductToCart = (product, id) => {
  const productId = product.id
  return async dispatch => {
    try {
      if (!id) {
        let newCart = JSON.parse(window.localStorage.getItem('cart'))
        const productExistsInCart = newCart.some(localProduct => {
          return localProduct.id === productId
        })
        if (!productExistsInCart) {
          window.localStorage.setItem(
            'cart',
            JSON.stringify([...newCart, product])
          )
        } else {
          product = null
        }
      } else {
        const response = await axios.post(`/api/users/${id}/cart`, {
          productId,
          id
        })
        product = response.data
      }
      if (product) dispatch(addCart(product))
      location.pathname === '/products'
        ? history.push('/products')
        : history.push(location.pathname)
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeProductFromCart = (productId, id) => {
  return async dispatch => {
    try {
      if (!id) {
        const cart = JSON.parse(window.localStorage.getItem('cart'))
        const newCart = cart.filter(item => item.id !== productId)
        window.localStorage.setItem('cart', JSON.stringify(newCart))
      } else {
        await axios.delete(`/api/users/${id}/cart`, {
          params: {productId}
        })
      }
      dispatch(removeCart(productId))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  cart: []
}

//reducer

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CART:
      return {...state, cart: action.cart}
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.product]}
    case REMOVE_FROM_CART:
      const newCart = state.cart.filter(item => item.id !== action.productId)
      return {...state, cart: newCart}
    default:
      return state
  }
}

export default cartReducer
