import axios from 'axios'

// action type
const GOT_USER_CART = 'GOT_USER_CART'
//action creator export const all
export const gotUserCart = cart => ({type: GOT_USER_CART, cart})

// thunk creator
export const fetchUserCart = id => {
  console.log(id)
  return async dispatch => {
    try {
      const cart = await axios.get(`/api/users/${id}/cart`)
      console.log(cart, 'cart in cartreducer')
      dispatch(gotUserCart(cart.data))
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
    case GOT_USER_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}

export default cartReducer
