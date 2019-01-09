const express = require('express')
const router = express.Router()

const Product = require('../db/models/product')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    if (products.length) {
      res.json(products)
    } else {
      const error = new Error('no products found!')
      error.status = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router