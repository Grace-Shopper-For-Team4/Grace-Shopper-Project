const {Order, OrderProduct, Product} = require('../db/models')

module.exports = {
  async findOrCreateCartInstance(userId) {
    const order = await Order.findOrCreate({
      where: {
        userId,
        isBought: false
      }
    })
    return order[0]
  },
  async findAndFormatCartProducts(cartInstance) {
    const unformattedCartProducts = await OrderProduct.findAll({
      where: {orderId: cartInstance.dataValues.id},
      include: [{model: Product}]
    })
    return unformattedCartProducts.map(cartProduct => {
      const stockProduct = cartProduct.product.dataValues
      return {...stockProduct, quantity: cartProduct.quantity}
    })
  },
  async productExistsInCart(productId, orderId) {
    const productInCart = await OrderProduct.findOne({
      where: {productId, orderId}
    })
    return !!productInCart
  },
  async isInvalidProductId(productId) {
    const product = await Product.findById(productId)
    return !product
  },
  async isValidOrderQuantity(productId, requestedQuantity) {
    const {stockQuantity} = await Product.findById(productId)
    return requestedQuantity <= stockQuantity
      ? {invalidQuantity: false}
      : {
          invalidQuantity: true,
          requestedQuantity,
          stockQuantity
        }
  },
  async getProductPrice(productId) {
    const productInstance = await Product.findById(productId, {
      attributes: ['price']
    })
    return productInstance.dataValues.price
  },
  // only allow user to add item to cart if it doesn't already exist in cart,
  // if productId is valid id (i.e. it exists in products table), and
  // quantity does not exceed current available stock
  async createValidCartProductInstance(productId, requestedQuantity, userId) {
    const cartInstance = await this.findOrCreateCartInstance(userId)
    const orderId = cartInstance.dataValues.id
    if (await this.productExistsInCart(productId, orderId)) {
      return {
        invalidRequest: true,
        validationMessage: 'Validation Error: Product already exists in cart'
      }
    } else if (await this.isInvalidProductId(productId)) {
      return {
        invalidRequest: true,
        validationMessage:
          'Validation Error: Product does not have a valid productId.'
      }
    } else {
      const quantityValidationResult = await this.isValidOrderQuantity(
        productId,
        requestedQuantity
      )
      if (quantityValidationResult.invalidQuantity) {
        return {
          invalidRequest: true,
          validationMessage: 'Validation Error: Requested quantity is invalid.',
          ...quantityValidationResult
        }
      } else {
        return OrderProduct.create({
          productId,
          quantity: requestedQuantity,
          orderId
        })
      }
    }
  },
  getCartProduct(productId, orderId) {
    return OrderProduct.findOne({
      where: {
        productId,
        orderId
      }
    })
  },
  async removeValidCartProduct(productId, userId) {
    const cartInstance = await this.findOrCreateCartInstance(userId)
    const orderId = cartInstance.dataValues.id
    const productInstance = await this.getCartProduct(productId, orderId)
    if (!productInstance) {
      return {
        invalidRequest: true,
        validationMessage: 'Validation Error: Product does not exist in cart'
      }
    } else if (await this.isInvalidProductId(productId)) {
      return {
        invalidRequest: true,
        validationMessage:
          'Validation Error: Product does not have a valid productId.'
      }
    } else {
      await productInstance.destroy()
      return {invalidRequest: false}
    }
  },
  async updateValidCartProduct(productId, requestedQuantity, userId) {
    const cartInstance = await this.findOrCreateCartInstance(userId)
    const orderId = cartInstance.dataValues.id
    const productInstance = await this.getCartProduct(productId, orderId)
    if (!productInstance) {
      return {
        invalidRequest: true,
        validationMessage: 'Validation Error: Product does not exist in cart'
      }
    } else if (await this.isInvalidProductId(productId)) {
      return {
        invalidRequest: true,
        validationMessage:
          'Validation Error: Product does not have a valid productId.'
      }
    } else {
      const quantityValidationResult = await this.isValidOrderQuantity(
        productId,
        requestedQuantity
      )
      if (quantityValidationResult.invalidQuantity) {
        return {
          invalidRequest: true,
          validationMessage: 'Validation Error: Requested quantity is invalid.',
          ...quantityValidationResult
        }
      } else {
        const updatedProduct = await productInstance.update({
          quantity: requestedQuantity
        })
        return updatedProduct
      }
    }
  },
  async checkoutValidCartOrder(userCart, userId = null) {
    const validatedData = {cartValues: []}
    let dataValidationLog = {}
    const cartInstance = await this.findOrCreateCartInstance(userId)
    const orderId = cartInstance.dataValues.id
    for (let i = 0; i < userCart.length; i++) {
      const userCartProduct = userCart[i]
      const productId = userCartProduct.id
      if (await this.isInvalidProductId(productId)) {
        validatedData.dataIsInvalid = true
        dataValidationLog.invalidProductId = true
        dataValidationLog.productId = productId
        dataValidationLog.validationMessage =
          'Validation Error: Requested productId is invalid.'
        break
      }
      const {quantity} = userCartProduct
      const quantityValidation = await this.isValidOrderQuantity(
        productId,
        quantity
      )
      if (quantityValidation.invalidQuantity) {
        validatedData.dataIsInvalid = true
        dataValidationLog = {...quantityValidation}
        dataValidationLog.productId = productId
        dataValidationLog.validationMessage =
          'Validation Error: Requested quantity is invalid.'
        break
      } else {
        const historicalPrice = await this.getProductPrice(productId)
        validatedData.cartValues.push({
          productId,
          orderId,
          quantity,
          historicalPrice
        })
      }
    }
    if (validatedData.dataIsInvalid) {
      await cartInstance.destroy()
      return {invalidRequest: true, dataValidationLog}
    } else {
      await validatedData.cartValues.forEach(async cartProduct => {
        const stockProduct = await Product.findById(cartProduct.productId)
        const newQuantity =
          stockProduct.dataValues.stockQuantity - cartProduct.quantity
        await cartInstance.update({
          isBought: true,
          purchaseDate: new Date()
        })
        await stockProduct.update({stockQuantity: newQuantity})
        const {productId, historicalPrice, quantity} = cartProduct
        const newOrderProductInstance = await OrderProduct.findOrCreate({
          where: {
            productId,
            orderId
          }
        })
        await newOrderProductInstance[0].update({quantity, historicalPrice})
      })
      return {invalidRequest: false}
    }
  },
  getPastOrders(userId) {
    return Order.findAll({
      where: {
        userId,
        isBought: true
      },
      include: [{model: OrderProduct}]
    })
  }
}
