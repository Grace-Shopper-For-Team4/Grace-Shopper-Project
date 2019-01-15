import {expect} from 'chai'
import {getProductsFromServer} from './reducer/products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getProductsFromServer', () => {
    it('eventually dispatches the GOT_PRODUCTS_FROM_SERVER action', async () => {
      const fakeProducts = {name: 'Obsidian'}
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      await store.dispatch(getProductsFromServer())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_PRODUCTS_FROM_SERVER')
      expect(actions[0].products).to.be.deep.equal(fakeProducts)
    })
  })
})
