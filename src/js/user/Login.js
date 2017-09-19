import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'
import { loginUser } from '../utilities/actions'

class Login extends React.Component {
	constructor(){
		super()
    this.handleClick = this.handleClick.bind(this)
	}

  handleClick(e){
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    return this.props.dispatch(loginUser(creds, this.props.history))
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

Login.propTypes = {
  errorMessage: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

export default Login