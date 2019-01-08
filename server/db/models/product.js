const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 100000
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    },
    defaultValue: ''
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product
