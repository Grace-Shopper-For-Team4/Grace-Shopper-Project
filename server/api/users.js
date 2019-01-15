const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')
const utils = require('./utils')

module.exports = router

// get all items in cart

router.get('/:userId/cart', async (req, res, next) => {
  try {
    if (req.user) {
      const userCart = await utils.findOrCreateCart(req.user.dataValues.id)
      const userCartProducts = await utils.findAndFormatCartProducts(userCart)
      res.json(userCartProducts)
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
      const {quantity} = req.body
      const response = await Order.findOrCreate({
        where: {
          userId: req.user.dataValues.id,
          isBought: false
        }
      })
      const orderId = response[0].dataValues.id
      const product = await Product.findById(productId)
      const productExistsInCart = await OrderProduct.findOne({
        where: {productId, orderId}
        // include: [{model: Product}]
      })
      // only allow user to add item to cart if it doesn't already exist in cart,
      // jf productId is valid id (i.e. it exists in products table), and
      // quantity does not exceed current available stock
      if (!productExistsInCart && product) {
        const {stockQuantity} = product
        if (quantity <= stockQuantity) {
          const orderProductInstance = await OrderProduct.create({
            productId,
            quantity,
            orderId
          })
          res.status(201).json(orderProductInstance)
        } else
          res
            .status(400)
            .send(
              `Validation error' quantity unavailable as ${
                stockQuantity ? 'only ' + stockQuantity : 'none'
              } left for requested product (productId: ${productId})`
            )
      } else {
        res
          .status(400)
          .send(
            'Validation Error: Product either already exists in cart or does not have a valid productId.'
          )
      }
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
      const response = await Order.findOrCreate({
        where: {
          userId: req.user.dataValues.id,
          isBought: false
        }
      })
      const orderId = response[0].dataValues.id

      const orderProduct = await OrderProduct.findOne({
        where: {
          productId: req.params.productId,
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
          const stockProduct = await Product.findById(product.id)
          const newStockQuantity = stockProduct.stockQuantity - product.quantity
          if (newStockQuantity >= 0) {
            await stockProduct.update({
              stockQuantity: newStockQuantity
            })
            return {
              productId: product.id,
              orderId: orderInstance.id,
              quantity: product.quantity,
              historicalPrice: stockProduct.price
            }
          }
        })
        await OrderProduct.bulkCreate(productsAndQuant)
        res.status(201).send('Cart successfully checked out!')
      } else {
        res
          .status(400)
          .send(
            'Validation Error: Cart is empty. Add some products and try again.'
          )
      }
      // else if user IS logged in, set the
      // historicalPrice on their cart products, set the purchaseDate on their
      // cart order, and flip their cart's isBought' flag to true:
    } else if (req.user) {
      const response = await Order.findOrCreate({
        where: {
          userId: req.user.dataValues.id,
          isBought: false
        },
        include: [{model: OrderProduct, include: [{model: Product}]}]
      })
      const orderInstance = response[0]
      const orderInstanceId = response[0].dataValues.id
      const cartProductInstances = await orderInstance.getOrderProducts({
        include: [{model: Product}]
      })
      let hasValidationFailed = false
      // make sure cart is not empty!
      if (cartProductInstances.length) {
        const requests = cartProductInstances.map(cartProductInstance => {
          const stockProduct = cartProductInstance.product
          const requestedQuantity = cartProductInstance.quantity
          const {stockQuantity} = stockProduct.dataValues
          return stockProduct
            .update({
              stockQuantity: stockQuantity - requestedQuantity
            })
            .catch(err => {
              hasValidationFailed = true
              console.error(err)
              return {
                errorName: err.name,
                stockProductId: stockProduct.dataValues.id,
                requestedQuantity,
                stockQuantity
              }
            })
        })

        const requestResults = await Promise.all(requests)
        // if any of the quantity requests fail validation, then loop through
        // the stockProductInstances that have updated and return their quantity
        // to what it was before
        if (hasValidationFailed) {
          await Promise.all(
            requestResults.reduce((validatedRequests, currProductInstance) => {
              if (!currProductInstance.errorName) {
                validatedRequests.push(
                  currProductInstance
                    .update({
                      stockQuantity: currProductInstance.previous(
                        'stockQuantity'
                      )
                    })
                    .catch(err => console.error(err))
                )
              }
              return validatedRequests
            }, [])
          )
          res
            .status(400)
            .send(
              'Validation Error: Product(s) unavailable in requested quantities. Please review your cart and try to checkout again.'
            )
          // otherwise, the quantity changes are all valid and we should update the historical
          // price of all order items and the order's isBought flag
        } else {
          await Promise.all(
            cartProductInstances.map(cartProductInstance => {
              const historicalPrice =
                cartProductInstance.product.dataValues.price
              return cartProductInstance.update({
                historicalPrice
              })
            })
          )
          await orderInstance.update({
            purchaseDate: new Date(),
            isBought: true
          })
          res.status(201).send('Cart successfully checked out!')
        }
      } else {
        res
          .status(400)
          .send(
            'Validation Error: Cart is empty. Add some products and try again.'
          )
      }
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})
