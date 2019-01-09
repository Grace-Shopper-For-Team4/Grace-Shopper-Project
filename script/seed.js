'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const products = await Promise.all([
    Product.create({
      name: 'obsidian',
      description:
        'Obsidian is a naturally occurring volcanic glass formed as an extrusive igneous rock. Obsidian is produced when felsic lava extruded from a volcano cools rapidly with minimal crystal growth.',
      quantity: 100,
      imageUrl:
        'https://en.wikipedia.org/wiki/Obsidian#/media/File:Lipari-Obsidienne_(5).jpg',
      price: 100,
      type: 'Igneous'
    }),
    Product.create({
      name: 'granite',
      description:
        'Granite is a common type of felsic intrusive igneous rock that is granular and phaneritic in texture. Granites can be predominantly white, pink, or gray in color, depending on their mineralogy.',
      quantity: 500,
      imageUrl:
        'https://en.wikipedia.org/wiki/Granite#/media/File:Fj%C3%A6regranitt3.JPG',
      price: 30,
      type: 'Metamorphic'
    }),
    Product.create({
      name: 'quartz',
      description:
        'Quartz is a mineral composed of silicon and oxygen atoms in a continuous framework of SiO₄ silicon–oxygen tetrahedra, with each oxygen being shared between two tetrahedra, giving an overall chemical formula of SiO₂. Quartz is the second most abundant mineral in Earths continental crust, behind feldspar.',
      quantity: 20,
      imageUrl:
        'https://en.wikipedia.org/wiki/Quartz#/media/File:Quartz,_Tibet.jpg',
      price: 40,
      type: 'Sedimentary'
    }),
    Product.create({
      name: 'basalt',
      description:
        'a dark, fine-grained volcanic rock that sometimes displays a columnar structure. It is typically composed largely of plagioclase with pyroxene and olivine.',
      quantity: 50,
      imageUrl:
        'https://en.wikipedia.org/wiki/Basalt#/media/File:BasaltUSGOV.jpg',
      price: 100,
      type: 'Igneous'
    }),
    Product.create({
      name: 'limestone',
      description:
        'Limestone is a sedimentary rock, composed mainly of skeletal fragments of marine organisms such as coral, forams and molluscs',
      quantity: 40,
      imageUrl:
        'https://en.wikipedia.org/wiki/Limestone#/media/File:Torcaldeantequera.jpg',
      price: 100,
      type: 'Sedimentary'
    }),
    Product.create({
      name: 'shale',
      description:
        'Shale is a fine-grained, clastic sedimentary rock composed of mud that is a mix of flakes of clay minerals and tiny fragments of other minerals, especially quartz and calcite. Shale is characterized by breaks along thin laminae or parallel layering or bedding less than one centimeter in thickness, called fissility',
      quantity: 30,
      imageUrl:
        'https://en.wikipedia.org/wiki/Shale#/media/File:ShaleUSGOV.jpg',
      price: 200,
      type: 'Sedimentary'
    }),
    Product.create({
      name: 'obsidian',
      description:
        'Obsidian is a naturally occurring volcanic glass formed as an extrusive igneous rock. Obsidian is produced when felsic lava extruded from a volcano cools rapidly with minimal crystal growth.',
      quantity: 100,
      imageUrl:
        'https://en.wikipedia.org/wiki/Obsidian#/media/File:Lipari-Obsidienne_(5).jpg',
      price: 100,
      type: 'Igneous'
    }),
    Product.create({
      name: 'granite',
      description:
        'Granite is a common type of felsic intrusive igneous rock that is granular and phaneritic in texture. Granites can be predominantly white, pink, or gray in color, depending on their mineralogy.',
      quantity: 500,
      imageUrl:
        'https://en.wikipedia.org/wiki/Granite#/media/File:Fj%C3%A6regranitt3.JPG',
      price: 30,
      type: 'Igneous'
    }),
    Product.create({
      name: 'quartz',
      description:
        'Quartz is a mineral composed of silicon and oxygen atoms in a continuous framework of SiO₄ silicon–oxygen tetrahedra, with each oxygen being shared between two tetrahedra, giving an overall chemical formula of SiO₂. Quartz is the second most abundant mineral in Earths continental crust, behind feldspar.',
      quantity: 20,
      imageUrl:
        'https://en.wikipedia.org/wiki/Quartz#/media/File:Quartz,_Tibet.jpg',
      price: 40,
      type: 'Sedimentary'
    }),
    Product.create({
      name: 'Dwayne Johnson',
      description: 'More dangerous than granite.',
      quantity: 20,
      imageUrl: 'https://bit.ly/2lHBJQo',
      price: 0,
      type: 'The Rock'
    })
  ])
  console.log(`seeded ${products.length} products`)

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
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
