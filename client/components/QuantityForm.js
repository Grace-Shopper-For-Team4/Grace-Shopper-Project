import React from 'react'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Form,
  Button
} from 'react-bootstrap'

const QuantityForm = () => {
  const handleSubmit = event => {
    event.preventDefault()
    console.log(event.target)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Change Quantity:</ControlLabel>
        <FormControl componentClass="select" placeholder="select">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </FormControl>
        <Button type="submit" bsStyle="info" bsSize="xsmall">
          Change Quantity
        </Button>
      </FormGroup>
    </Form>
  )
}

export default QuantityForm
