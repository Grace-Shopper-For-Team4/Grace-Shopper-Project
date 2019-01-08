const Sequelize = require('sequelize')
const db = require('../db')

const CartProduct = db.define('cartProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 100000
    }
  }
})

module.exports = CartProduct
