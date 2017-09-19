import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'
import { signupUser } from '../utilities/actions'

class Signup extends React.Component {
	constructor(){
		super()
    this.handleClick = this.handleClick.bind(this)
	}

  handleClick(e, history){
    const username = this.refs.username
    const password = this.refs.password
    const password2 = this.refs.repeatPassword
    const newUserCreds = { username: username.value.trim(), 
                           password: password.value.trim(),
                           password2: password2.value.trim() }
    console.log(newUserCreds)
    return this.props.dispatch(signupUser(newUserCreds, this.props.history))
  }

	render(){
    const { history, errorMessage } = this.props
		return (
      <div>
        <Form>
          <Form.Field>
            <label>Username</label>
            <input ref="username" placeholder='Email address or username' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input ref="password" placeholder='Password' />
          </Form.Field>
          <Form.Field>
            <label>Confirm password</label>
            <input ref="repeatPassword" placeholder='Confirm password' />
          </Form.Field>
          {errorMessage &&
            <p >{errorMessage}</p>
          }
          <Button type='submit' 
            onClick={(event) => this.handleClick(event)}>
            Login
          </Button>
        </Form>
      </div>
    )
	}
}

Signup.propTypes = {
  errorMessage: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

export default Signup