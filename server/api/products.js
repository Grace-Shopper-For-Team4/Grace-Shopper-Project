const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Product = require('../db/models/product')

// fetch all 'in-stock' products (stock quantity greater than 0)

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        stockQuantity: {
          [Op.gt]: 0
        }
      },
      order: [['id', 'ASC']]
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})

// fetch individual products by productId

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
    if (product) res.json(product)
    else res.status(404).send('Error - Product does not exist!')
  } catch (error) {
    next(error)
  }
})

module.exports = router
