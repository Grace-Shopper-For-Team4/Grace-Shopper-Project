import React from 'react'
import {Link} from 'react-router-dom'
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
        <Button bsSize="large" type="button" bsStyle="info" href="/products">
          Back to AllProducts!
        </Button>
      </Row>
    </Grid>
  )
}

export default errorPage
