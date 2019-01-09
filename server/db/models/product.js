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
  //CG: I don't know that maximum is a necessary validation.
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 100000
    }
  },
  //CG: If possible put this a string. 
  imageUrl: {
    type: Sequelize.TEXT,
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
  }, //CG: Consider ENUM support. (Igneous, igneous)
  type: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product
