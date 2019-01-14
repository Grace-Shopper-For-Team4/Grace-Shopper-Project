// /* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const axios = require('axios')
const agent = require('supertest')(app)

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  let rock1, rock2, rock3, rock4

  describe('GET `/api/products/` route', () => {
    beforeEach(async () => {
      rock1 = await Product.create({
        name: 'Steve',
        description: 'is not a rock',
        stockQuantity: 40,
        price: 800
      })
      rock2 = await Product.create({
        name: 'Tigers',
        description: 'are not rocks',
        stockQuantity: 40,
        price: 800
      })
      rock3 = await Product.create({
        name: 'Suzie',
        description: 'is not a rock',
        stockQuantity: 40,
        price: 800
      })
      rock4 = await Product.create({
        name: 'Alligators',
        description: 'are not rocks',
        stockQuantity: 40,
        price: 801
      })
    })

    // it('Returns all products', async () => {
    //   const { unRocks } = await agent.get('/api/products')
    //   expect(unRocks[0].name).to.equal('Steve')
    // })
  })
})
