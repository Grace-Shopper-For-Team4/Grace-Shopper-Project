import React from 'react'
import {NavLink} from 'react-router-dom'
import {Grid, Row, Col, ProgressBar, Button} from 'react-bootstrap'

const errorPage = () => {
  return (
    <Grid>
      <Row>
        <Col md={12}>
          <div className="error-template">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <ProgressBar active striped bsStyle="danger" now={80} />
            <div className="error-details">
              Sorry, an error has occured, Requested page not found!
            </div>
          </div>
        </Col>
      </Row>
      <Row id="errorButton">
        <NavLink to="/products">
          <Button type="button" bsStyle="info">
            Back to All Product
          </Button>
        </NavLink>
      </Row>
    </Grid>
  )
}

export default errorPage
