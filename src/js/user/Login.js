import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, FormControl, ControlLabel, Col, Alert, Panel } from 'react-bootstrap'
import { loginUser } from './actions'
import Container from '../utilities/Container'

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
		return (
      <Container>
				<Panel>
					<Panel.Heading>
						Login
					</Panel.Heading>
					<Panel.Body>
						<Form horizontal>
							  <FormGroup controlId="usernameEmail">
									<Col componentClass={ControlLabel} sm={2}>
										Username or email
									</Col>
									<Col sm={8}>
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
									<Col sm={8}>
										<FormControl
											inputRef={ref => { this.password = ref } }
											type="password"
											placeholder="Password" />
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
					            Login
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
