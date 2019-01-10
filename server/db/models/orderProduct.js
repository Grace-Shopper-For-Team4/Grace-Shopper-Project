const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  historicalPrice: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    allowNull: false
  }
})

module.exports = OrderProduct
