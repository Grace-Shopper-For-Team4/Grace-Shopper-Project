const router = require('express').Router()
const {User, Order, OrderProduct, Product} = require('../db/models')
module.exports = router

// get all items in cart

router.get('/:id/cart', async (req, res, next) => {
  try {
    if (req.user && req.user.dataValues.id === Number(req.params.id)) {
      const order = await Order.findOne({
        where: {
          userId: req.params.id,
          isBought: false
        }
      })
      const cart = await OrderProduct.findAll({
        where: {orderId: order.dataValues.id},
        include: [{model: Product}]
      })
      res.json(cart)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

// add item to cart

router.post('/:id/cart', async (req, res, next) => {
  try {
    if (req.user && req.user.dataValues.id === Number(req.params.id)) {
      const {productId, quantity} = req.body
      const order = await Order.findOne({
        where: {
          userId: req.params.id,
          isBought: false
        }
      })
      const productExistsInCart = await OrderProduct.find({
        where: {productId}
      })
      // only allow user to add item to cart if it doesn't exist in cart already
      if (!productExistsInCart) {
        const product = await OrderProduct.create({
          productId,
          quantity,
          orderId: order.dataValues.id
        })
        res.status(201).json(product)
      } else {
        res.send(409, 'product exists in cart already')
      }
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})
