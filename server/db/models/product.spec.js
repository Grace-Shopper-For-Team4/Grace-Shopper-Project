/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')

const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Price', () => {
    let rock

    beforeEach(async () => {
      rock = await Product.create({
        name: 'arrowhead',
        description: 'a rare and pointy rock',
        stockQuantity: 5,
        price: 900,
        type: 'The Rock'
      })
    })

    it('returns with the current price', () => {
      expect(rock.price).to.be.equal(900)
    })
  })
  describe('Description is Sequelize.TEXT', () => {
    let rock

    beforeEach(async () => {
      rock = await Product.create({
        name: 'arrowhead',
        description:
          'There was a wisteria vine blooming for the second time that summer on a wooden trellis before one window, into which sparrows came now and then in random gusts, making a dry vivid dusty sound before going away: and opposite Quentin, Miss Coldfield in the eternal black which she had worn for forty-three years now, whether for sister, father, or nothusband none knew, sitting so bolt upright in the straight hard chair that was so tall for her that her legs hung straight and rigid as if she had iron shinbones and ankles, clear of the floor with that air of impotent and static rage like children’s feet, and talking in that grim haggard amazed voice until at last listening would renege and hearing-sense self-confound and the long-dead object of her impotent yet indomitable frustration would appear, as though by outraged recapitulation evoked, quiet inattentive and harmless, out of the biding and dreamy and victorious dust.',
        stockQuantity: 5,
        price: 900,
        type: 'The Rock'
      })
    })

    it('allows for a long description', () => {
      expect(rock.description.length).to.be.greaterThan(200)
    })
  })
})
