const express = require('express')
const router = express.Router()

const Product = require('../db/models/product')

/*
  /products/:id --> give me the product with this id.
*/
router.get('/', async (req, res, next) => {
  try {
    // CG: req.query
    const products = await Product.findAll({
      // where: req.query || {}
    })
    if (products.length) {
      res.json(products)
      //CG: I'd say get rid of this support.
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
