const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    it('Does not allow a /GET request to easily get user data', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(404)
    })
  })
})
