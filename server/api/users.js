const router = require('express').Router()
const {User, Order, OrderProduct, Product} = require('../db/models')
module.exports = router

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
