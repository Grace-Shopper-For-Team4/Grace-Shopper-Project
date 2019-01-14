import React from 'react'
import {Carousel} from 'react-bootstrap'

const HomePage = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          alt="900x500"
          src="https://images.unsplash.com/photo-1512921709377-a2822d4e27c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        />
        <Carousel.Caption>
          <h1>Fancy Rock Shop</h1>
          <p>Have fun with rock shopping!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          alt="900x500"
          src="https://images.unsplash.com/photo-1507832321772-e86cc0452e9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        />
        <Carousel.Caption>
          <h1>Fancy Rock Shop</h1>
          <p>Have fun with rock shopping!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          alt="900x500"
          src="https://images.unsplash.com/photo-1517768692594-b4295586b7d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"
        />
        <Carousel.Caption>
          <h1>Fancy Rock Shop</h1>
          <p>Have fun with rock shopping!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default HomePage
