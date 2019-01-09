const router = require('express').Router()
const {User, Order, OrderProduct, Product} = require('../db/models')
module.exports = router

router.get('/:id/cart', async (req, res, next) => {
  try {
    if (req.user) {
      const orderId = await Order.findOne({
        where: {
          userId: req.params.id,
          isBought: false
        }
      })
      const cart = await OrderProduct.findAll({
        where: {orderId},
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
