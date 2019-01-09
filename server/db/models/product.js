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
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://bit.ly/2lHBJQo'
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM('Igneous', 'Metamorphic', 'Sedimentary', 'The Rock'),
    allowNull: false,
    defaultValue: 'The Rock'
  }
})

module.exports = Product
