import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import {SocialIcon} from 'react-social-icons'
import {auth} from '../store'

import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Col,
  Button
} from 'react-bootstrap'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <div id="authFormName">
        <h3>Please {displayName} </h3>
      </div>
      {error &&
        error.response && <div id="authError"> {error.response.data} </div>}
      <Form onSubmit={handleSubmit} name={name}>
        <FormGroup controlId="formControlsEmail">
          <ControlLabel className="pull-left">Email</ControlLabel>
          <FormControl name="email" type="email" placeholder="Email" />
        </FormGroup>

        <FormGroup controlId="formControlsPassword">
          <ControlLabel className="pull-left">Password</ControlLabel>
          <FormControl name="password" type="password" placeholder="Password" />
        </FormGroup>

        <Button type="submit">{displayName}</Button>
      </Form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
