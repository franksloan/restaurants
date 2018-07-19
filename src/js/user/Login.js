import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, FormControl, ControlLabel, Col, Alert, Panel, Checkbox } from 'react-bootstrap'
import { loginUser, resetPassword } from './actions'
import Container from '../utilities/Container'

class Login extends React.Component {
	constructor(){
		super()
    this.handleClick = this.handleClick.bind(this)
		this.toggleResetPassword = this.toggleResetPassword.bind(this)
		this.state = { resetPassword: false }
	}


	toggleResetPassword(){
		this.setState({resetPassword: !this.state.resetPassword})
	}


  handleClick(e){
		e.preventDefault()
		if(this.state.resetPassword){
			return this.props.dispatch(resetPassword({email: this.usernameEmail.value.trim()}, this.props.history))
		}
    const creds = { username: this.usernameEmail.value.trim(), password: this.password.value.trim() }
    return this.props.dispatch(loginUser(creds, this.props.history))
  }


	render(){
    const { history, loginErrorMessage } = this.props
		return (
      <Container maxWidth='600px' width='95%' display='block' margin='auto'>
				<Panel>
					<Panel.Heading>
						Login
					</Panel.Heading>
					<Panel.Body>
						<Form horizontal>
							  <FormGroup controlId="usernameEmail">
									<Col componentClass={ControlLabel} sm={2}>
										{this.state.resetPassword ? "Email" : "Username or email"}
									</Col>
									<Col sm={8}>
										<FormControl
											inputRef={ref => { this.usernameEmail = ref } }
											type="usernameEmail"
											placeholder={this.state.resetPassword ? "Email" : "Username or email"} />
									</Col>
								</FormGroup>
								{!this.state.resetPassword &&
									<FormGroup controlId="password">
										<Col componentClass={ControlLabel} sm={2}>
											Password
										</Col>
										<Col sm={8}>
											<FormControl
												inputRef={ref => { this.password = ref } }
												type="password"
												placeholder="Password" />
										</Col>
									</FormGroup>
								}
								<FormGroup>
									<Col smOffset={2} sm={8}>
										<Checkbox onClick={this.toggleResetPassword}>
								      Forgotten password?
								    </Checkbox>
									</Col>
								</FormGroup>
								{loginErrorMessage &&
									<Col smOffset={2} sm={8}>
			            	<Alert bsStyle="danger">{loginErrorMessage}</Alert>
									</Col>
			          }
								<FormGroup>
									<Col smOffset={2} sm={8}>
										<Button type='submit'
					            onClick={(event) => this.handleClick(event)}>
					            {this.state.resetPassword ?  "Submit" : "Login"}
					          </Button>
									</Col>
								</FormGroup>
							</Form>
						</Panel.Body>
					</Panel>
      	</Container>
    )
	}
}

Login.propTypes = {
  loginErrorMessage: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

export default Login
