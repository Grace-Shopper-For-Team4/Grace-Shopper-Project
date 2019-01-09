const express = require('express')
const router = express.Router()

const Product = require('../db/models/product')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

module.exports = router
