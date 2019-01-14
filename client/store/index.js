import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './reducer/user'
import productsReducer from './reducer/products'
import cartReducer from './reducer/cart'

const reducer = combineReducers({user, productsReducer, cartReducer})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './reducer/user'
export * from './reducer/cart'
export * from './reducer/products'
