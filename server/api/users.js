const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')
const utils = require('./utils')

module.exports = router

// get all items in cart

router.get('/:userId/cart', async (req, res, next) => {
  try {
    if (req.user) {
      const cartInstance = await utils.findOrCreateCartInstance(
        req.user.dataValues.id
      )
      const cartProducts = await utils.findAndFormatCartProducts(cartInstance)
      res.json(cartProducts)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

// add item to user's cart

router.post('/:userId/cart/products/:productId', async (req, res, next) => {
  try {
    if (req.user) {
      const productId = req.params.productId
      const requestedQuantity = req.body.quantity
      // validation is handled in utils
      const validationResult = await utils.createValidCartProductInstance(
        productId,
        requestedQuantity,
        req.user.dataValues.id
      )
      if (validationResult.invalidResult) {
        res.status(400).json(validationResult)
      } else res.status(201).send(validationResult)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

// remove item from user's cart

router.delete('/:userId/cart/products/:productId', async (req, res, next) => {
  try {
    if (req.user) {
      const productId = req.params.productId
      const userId = req.user.dataValues.id
      // handle validation in utils
      const validationResult = await utils.removeValidCartProduct(
        productId,
        userId
      )
      if (validationResult.invalidRequest) {
        res.status(404).json(validationResult)
      } else res.status(204).send('Successfully Deleted')
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

// update item in user's cart

router.put('/:userId/cart/products/:productId', async (req, res, next) => {
  try {
    if (req.user) {
      const productId = req.params.productId
      const requestedQuantity = req.body.quantity
      const userId = req.user.dataValues.id
      // handle validation in utils
      const validationResult = await utils.updateValidCartProduct(
        productId,
        requestedQuantity,
        userId
      )
      if (validationResult.invalidRequest) {
        res.status(404).json(validationResult)
      } else res.status(200).json(validationResult)
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
    let cart
    if (!req.user) cart = req.body.cart
    else {
      const cartInstance = await utils.findOrCreateCartInstance(
        req.user.dataValues.id
      )
      cart = await utils.findAndFormatCartProducts(cartInstance)
    }
    // if cart is not empty for user or guest:
    if (cart.length) {
      // handle most of heavy validation checking in utils:
      const validationResult = await utils.checkoutValidCartOrder(
        cart,
        req.user && req.user.dataValues.id
      )
      if (validationResult.invalidRequest) {
        res.status(400).json(validationResult.dataValidationLog)
      } else res.status(200).send('Cart successfully checked out!')
    } else {
      res
        .status(400)
        .send(
          'Cart is empty or undefined. Please add some products and try again!'
        )
    }
  } catch (error) {
    next(error)
  }
})

// get past orders (order history)

router.get('/:userId/orders', async (req, res, next) => {
  try {
    if (req.user) {
      const pastOrders = await utils.getPastOrders(req.user.dataValues.id)
      res.status(200).json(pastOrders)
    } else res.sendStatus(401)
  } catch (error) {
    console.error(error)
  }
})
