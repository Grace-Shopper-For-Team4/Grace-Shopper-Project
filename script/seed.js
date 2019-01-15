'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderProduct} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const products = await Promise.all([
    Product.create({
      name: 'Obsidian',
      description:
        'Obsidian is a naturally occurring volcanic glass formed as an extrusive igneous rock. Obsidian is produced when felsic lava extruded from a volcano cools rapidly with minimal crystal growth.',
      stockQuantity: 100,
      imageUrl: 'https://geology.com/rocks/pictures/obsidian-380.jpg',
      price: 10000,
      type: 'Igneous'
    }),
    Product.create({
      name: 'Granite',
      description:
        'Granite is a common type of felsic intrusive igneous rock that is granular and phaneritic in texture. Granites can be predominantly white, pink, or gray in color, depending on their mineralogy.',
      stockQuantity: 500,
      imageUrl:
        'https://flexiblelearning.auckland.ac.nz/rocks_minerals/rocks/images/granite1.jpg',
      price: 30000,
      type: 'Metamorphic'
    }),
    Product.create({
      name: 'Quartz',
      description:
        'Quartz is a mineral composed of silicon and oxygen atoms in a continuous framework of SiO₄ silicon–oxygen tetrahedra, with each oxygen being shared between two tetrahedra, giving an overall chemical formula of SiO₂. Quartz is the second most abundant mineral in Earths continental crust, behind feldspar.',
      stockQuantity: 20,
      imageUrl:
        'http://www.galleries.com/minerals/gemstone/rose_qua/roq-28.jpg',
      price: 40000,
      type: 'Sedimentary'
    }),
    Product.create({
      name: 'Basalt',
      description:
        'a dark, fine-grained volcanic rock that sometimes displays a columnar structure. It is typically composed largely of plagioclase with pyroxene and olivine.',
      stockQuantity: 50,
      imageUrl: 'https://geology.com/rocks/pictures/basalt-380.jpg',
      price: 12500,
      type: 'Igneous'
    }),
    Product.create({
      name: 'Limestone',
      description:
        'Limestone is a sedimentary rock, composed mainly of skeletal fragments of marine organisms such as coral, forams and molluscs',
      stockQuantity: 40,
      imageUrl: 'https://geology.com/rocks/pictures/limestone-tufa-380.jpg',
      price: 31000,
      type: 'Sedimentary'
    }),
    Product.create({
      name: 'Shale',
      description:
        'Shale is a fine-grained, clastic sedimentary rock composed of mud that is a mix of flakes of clay minerals and tiny fragments of other minerals, especially quartz and calcite. Shale is characterized by breaks along thin laminae or parallel layering or bedding less than one centimeter in thickness, called fissility',
      stockQuantity: 50,
      imageUrl:
        'https://www.thoughtco.com/thmb/lAcAtCAwY7l_0uKtQzAaUFtcRSE=/500x378/filters:no_upscale()/basaltcrust-56a367293df78cf7727d2fe1.jpg',
      price: 9500,
      type: 'Sedimentary'
    }),
    Product.create({
      name: 'Pile of Ugly Rocks',
      description:
        'We have the typical rocks coming up on our farm, plus old pieces of cement foundation from a previous barn. They are not attractive, even when the dirt is off of them. What should we do with them? Farm work will inevitably produce more of them so whatever we do has to be able to continue to (slowly) grow over the next few decades.',
      stockQuantity: 100,
      imageUrl: 'http://www.rocksforfun.com/image/rock245b.jpg',
      price: 846,
      type: 'Igneous'
    }),
    Product.create({
      name: 'A Piece of Stonehenge',
      description:
        'Selling these pieces of history is more graverobbing than actuale-commerce, so naturally this is an expensive product.',
      stockQuantity: 12,
      imageUrl:
        'https://flexiblelearning.auckland.ac.nz/rocks_minerals/rocks/images/granite1.jpg',
      price: 350000000,
      type: 'Metamorphic'
    }),
    Product.create({
      id: 9,
      name: 'Dwayne Johnson',
      description: 'More dangerous than granite.',
      stockQuantity: 20,
      imageUrl: 'https://bit.ly/2lHBJQo',
      price: 0,
      type: 'The Rock'
    })
  ])
  console.log(`seeded ${products.length} products successfully`)

  const users = await Promise.all([
    User.create({id: 1, email: 'cody@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)

  const cart = await Promise.all([Order.create({userId: 1})])

  console.log(`seeded ${cart.length} cartProducts`)

  const cartProducts = await Promise.all([
    OrderProduct.create({
      orderId: 1,
      productId: 1,
      quantity: 1
    }),
    OrderProduct.create({
      orderId: 1,
      productId: 2,
      quantity: 1
    }),
    OrderProduct.create({
      orderId: 1,
      productId: 3,
      quantity: 1
    }),
    OrderProduct.create({
      orderId: 1,
      productId: 4,
      quantity: 1
    }),
    OrderProduct.create({
      orderId: 1,
      productId: 5,
      quantity: 1
    }),
    OrderProduct.create({
      orderId: 1,
      productId: 9,
      quantity: 1
    })
  ])

  console.log(`seeded ${cartProducts.length} orderProducts`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
