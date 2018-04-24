import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap'
import { loginUser } from './actions'

class Login extends React.Component {
	constructor(){
		super()
    this.handleClick = this.handleClick.bind(this)
	}


  handleClick(e){
		e.preventDefault()

    const creds = { username: this.usernameEmail.value.trim(), password: this.password.value.trim() }

    return this.props.dispatch(loginUser(creds, this.props.history))
  }


	render(){
    const { history, loginErrorMessage } = this.props
		console.log(this.props)
		return (
      <div>
			<Form horizontal>
				  <FormGroup controlId="usernameEmail">
						<Col componentClass={ControlLabel} sm={2}>
							Username or email
						</Col>
						<Col sm={10}>
							<FormControl
								inputRef={ref => { this.usernameEmail = ref } }
								type="usernameEmail"
								placeholder="Username or email" />
						</Col>
					</FormGroup>

					<FormGroup controlId="password">
						<Col componentClass={ControlLabel} sm={2}>
							Password
						</Col>
						<Col sm={10}>
							<FormControl
								inputRef={ref => { this.password = ref } }
								type="password"
								placeholder="Password" />
						</Col>
					</FormGroup>
					{loginErrorMessage &&
            <p>{loginErrorMessage}</p>
          }
					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button type='submit'
		            onClick={(event) => this.handleClick(event)}>
		            Login
		          </Button>
						</Col>
					</FormGroup>
					</Form>
      </div>
    )
	}
}

Login.propTypes = {
  loginErrorMessage: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

export default Login
