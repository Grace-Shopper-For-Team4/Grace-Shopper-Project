/* eslint-disable no-case-declarations */
import axios from 'axios'
import history from '../../history'
import {getProductsFromServer} from './products'

// action type
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
//action creator export const all
export const gotCart = (cart, total) => ({type: GOT_CART, cart, total})
export const addCart = product => ({type: ADD_TO_CART, product})
export const removeCart = productId => ({type: REMOVE_FROM_CART, productId})
export const gotCheckout = userCart => ({type: CHECKOUT_REQUEST, userCart})
export const updateQuantity = product => ({type: UPDATE_QUANTITY, product})

// help function
function compare(a, b) {
  if (a.id < b.id) return -1
  if (a.id > b.id) return 1
  return 0
}

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
        const response = await axios.get(`/api/users/${id}/cart`)
        newCart = response.data
      }
      let total = newCart.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      )
      newCart = newCart.sort(compare)
      dispatch(gotCart(newCart, total))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addProductToCart = (product, id, quantity) => {
  const productId = product.id
  if (!quantity) quantity = 1
  product = {...product, quantity: quantity}
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
        await axios.post(`/api/users/${id}/cart/products/${product.id}`, {
          productId,
          quantity,
          id
        })
      }
      dispatch(addCart(product))
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
        await axios.delete(`/api/users/${id}/cart/products/${productId}`)
      }
      dispatch(removeCart(productId))
      history.push('/cart')
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateCart = (quantity, product, userId) => {
  product.quantity = Number(quantity)
  return async dispatch => {
    try {
      if (!userId) {
        let cart = JSON.parse(window.localStorage.getItem('cart'))
        const newCart = cart.filter(item => item.id !== product.id)
        window.localStorage.setItem(
          'cart',
          JSON.stringify([...newCart, product])
        )
      } else {
        await axios.put(`/api/users/${userId}/cart/products/${product.id}`, {
          quantity
        })
      }
      dispatch(updateQuantity(product))
      history.push('/cart')
    } catch (error) {
      console.error(error)
    }
  }
}

export const commitCheckout = userId => {
  return async dispatch => {
    try {
      if (!userId) {
        let cart = JSON.parse(window.localStorage.getItem('cart'))
        const {data} = await axios.put(`/api/users/0/cart/`, {cart: cart})
        window.localStorage.setItem('cart', JSON.stringify([]))
        dispatch(gotCheckout(data))
      } else {
        const {data} = await axios.put(`/api/users/${userId}/cart/`)

        dispatch(gotCheckout(data))
      }

      dispatch(getProductsFromServer())
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  cart: [],
  totalPrice: 0
}

//reducer

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CART:
      return {...state, cart: action.cart, totalPrice: action.total}
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.product]
      }
    case REMOVE_FROM_CART:
      let newCart = state.cart.filter(item => item.id !== action.productId)
      return {...state, cart: newCart}
    case CHECKOUT_REQUEST:
      return {cart: []}
    case UPDATE_QUANTITY:
      newCart = state.cart.filter(item => item.id !== action.product.id)
      return {...state, cart: [...newCart, action.product]}
    default:
      return state
  }
}

export default cartReducer
