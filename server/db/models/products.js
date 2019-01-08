const Sequelize = require('sequelize')
const db = require('../db')

const Products = db.define('products', {
 
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description:{
    type: Sequelize.TEXT,
    allowNull:false
  },
  quantity:{
    type:Sequelize.INTEGER,
    validate:{
      min:0,
      max:100000
    }
  },
  imageUrl:{
    type:Sequelize.STRING,
    validate:{
      isUrl:true
    },
    defaultValue:''

  },
  price:{
    type:Sequelize.INTEGER,
    validate:{
      min:0
    }

  }
})


  module.exports = Products;