const router = require('express').Router()
const {User, Order, OrderProduct, Product} = require('../db/models')
module.exports = router

// get all items in cart

router.get('/:id/cart', async (req, res, next) => {
  try {
    if (req.user && req.user.dataValues.id === Number(req.params.id)) {
      const response = await Order.findOrCreate({
        where: {
          userId: req.params.id,
          isBought: false
        }
      })
      const cartProducts = await OrderProduct.findAll({
        where: {orderId: response[0].dataValues.id},
        include: [{model: Product}]
      })
      res.json(cartProducts)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

// add item to user's cart

router.post('/:id/cart', async (req, res, next) => {
  try {
    if (req.user && req.user.dataValues.id === Number(req.params.id)) {
      const {productId, quantity} = req.body
      const response = await Order.findOrCreate({
        where: {
          userId: req.params.id,
          isBought: false
        }
      })
      const orderId = response[0].dataValues.id
      const productExistsInCart = await OrderProduct.find({
        where: {productId, orderId}
      })
      // only allow user to add item to cart if it doesn't exist in cart already
      if (!productExistsInCart) {
        const product = await OrderProduct.create({
          productId,
          quantity,
          orderId
        })
        res.status(201).json(product)
      } else {
        res.status(409).send('product exists in cart already')
      }
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

// remove item from user's cart

router.delete('/:id/cart', async (req, res, next) => {
  try {
    if (req.user && req.user.dataValues.id === Number(req.params.id)) {
      const {productId} = req.body
      const order = await Order.findOne({
        where: {
          userId: req.params.id,
          isBought: false
        }
      })
      const orderId = order.dataValues.id

      const orderProduct = await OrderProduct.findOne({
        where: {
          productId: productId,
          orderId: orderId
        }
      })

      if (orderProduct) {
        await orderProduct.destroy()
        res.status(204).send('Successfully Deleted')
      } else res.sendStatus(404)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

// checkout items in user's or guest's cart

router.put('/:id/cart', async (req, res, next) => {
  try {
    // if user is not logged in (i.e. guest checkout), create an anonymous
    // order and orderProducts for all products in their cart with the proper
    // historicalPrice on the products and true 'isBought' flag / appropriate
    // purchaseDate on their order:
    if (!req.user) {
      if (req.body.cart && req.body.cart.length) {
        const {cart} = req.body
        const orderInstance = await Order.create({
          purchaseDate: new Date(),
          isBought: true
        })
        const productsAndQuant = await cart.map(async product => {
          const {price} = await Product.findOne({
            where: {
              id: product.id
            },
            attributes: ['price']
          })
          return {
            productId: product.id,
            orderId: orderInstance.id,
            quantity: product.quantity,
            historicalPrice: price
          }
        })
        await OrderProduct.bulkCreate(productsAndQuant)
        res.status(201).send('cart successfully checked out!')
      } else {
        res
          .status(409)
          .send('cart is empty! please add some products and try again.')
      }
      // else if user IS logged in and their ID matches the URL params id
      // (i.e. they are attempting to checkout their own cart), set the
      // historicalPrice on their cart products, set the purchaseDate on their
      // cart order, and flip their cart's isBought' flag to true:
    } else if (req.user && req.user.dataValues.id === Number(req.params.id)) {
      const response = await Order.findOrCreate({
        where: {
          userId: req.params.id,
          isBought: false
        }
      })
      const orderInstanceId = response[0].dataValues.id
      const cartProductInstances = await OrderProduct.findAll({
        where: {orderId: orderInstanceId},
        include: [{model: Product}]
      })
      // make sure cart is not empty!
      if (cartProductInstances.length) {
        await cartProductInstances.forEach(async cartProduct => {
          const {price} = cartProduct.product
          await cartProduct.update({
            historicalPrice: price
          })
        })
        await Order.update(
          {
            purchaseDate: new Date(),
            isBought: true
          },
          {
            where: {
              id: orderInstanceId
            }
          }
        )
        res.status(201).send('cart successfully checked out!')
      } else {
        res
          .status(409)
          .send('cart is empty! please add some products and try again.')
      }
      // otherwise, if user is logged in and their URL params ID does not
      // match their own ID (i.e. they are attemtping to checkout another
      // person's cart), respond with an unauthorized code of 401:
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})
