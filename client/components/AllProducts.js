import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Grid, Row, Col} from 'react-bootstrap'

export default class AllProducts extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={4}>Sample Rock 1</Col>
          <Col md={4}>Sample Rock 2</Col>
          <Col md={4}>Sample Rock 3</Col>
        </Row>
      </Grid>
    )
  }
}
