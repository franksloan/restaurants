import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'
import { signupUser } from './actions'

class Signup extends React.Component {
	constructor(){
		super()
    this.handleClick = this.handleClick.bind(this)
	}

  handleClick(e, history){
    const username = this.refs.username
    const email = this.refs.email
    const password = this.refs.password
    const passwordConf = this.refs.passwordConf
    const newUserCreds = { username: username.value.trim(),
                           email: email.value.trim(), 
                           password: password.value.trim(),
                           passwordConf: passwordConf.value.trim() }
    return this.props.dispatch(signupUser(newUserCreds, this.props.history))
  }

	render(){
    const { history, errorMessage } = this.props
		return (
      <div>
        <Form>
          <Form.Field>
            <label>Username</label>
            <input ref="username" placeholder='Username' />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input ref="email" placeholder='Email address' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input ref="password" placeholder='Password' />
          </Form.Field>
          <Form.Field>
            <label>Confirm password</label>
            <input ref="passwordConf" placeholder='Confirm password' />
          </Form.Field>
          {errorMessage &&
            <p >{errorMessage}</p>
          }
          <Button type='submit' 
            onClick={(event) => this.handleClick(event)}>
            Signup
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