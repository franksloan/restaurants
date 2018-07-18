import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, FormControl, ControlLabel, Col, Panel, Alert } from 'react-bootstrap'
import { signupUser } from './actions'
import Container from '../utilities/Container'
import validator from 'email-validator'

class Signup extends React.Component {
	constructor(){
		super()
    this.handleClick = this.handleClick.bind(this)
		this.handleEmail = this.handleEmail.bind(this)
		this.getEmailValidationState = this.getEmailValidationState.bind(this)
		this.state = {}
	}

	getEmailValidationState(){
		if (!this.state.email || this.state.email.length == 0){
			return null
		} else if(validator.validate(this.state.email)){
			return 'success'
		}
		return 'error'
  }

	handleEmail(){
    this.setState({email: this.email.value})
  }

  handleClick(e, history){
		e.preventDefault()
    const newUserCreds = { username: this.username.value.trim(),
                           email: this.email.value.trim(),
                           password: this.password.value.trim(),
                           passwordConf: this.passwordConf.value.trim() }
    return this.props.dispatch(signupUser(newUserCreds, this.props.history))
  }

	render(){
    const { history, signupErrorMessage } = this.props
		return (
			<Container maxWidth='600px' width='95%' display='block' margin='auto'>
				<Panel>
					<Panel.Heading>
						Sign up
					</Panel.Heading>
					<Panel.Body>
			      <div>
							<Form horizontal>
							  <FormGroup controlId="username">
									<Col componentClass={ControlLabel} sm={2}>
										Username
									</Col>
									<Col sm={8}>
										<FormControl
											inputRef={ref => { this.username = ref } }
											type="username"
											placeholder="Username" />
									</Col>
								</FormGroup>

								<FormGroup controlId="email" validationState={this.getEmailValidationState()}>
									<Col componentClass={ControlLabel} sm={2}>
										Email
									</Col>
									<Col sm={8}>
										<FormControl
										  inputRef={ref => { this.email = ref } }
											type="email"
											placeholder="Email"
											onChange={this.handleEmail}/>
										<FormControl.Feedback />
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

								<FormGroup controlId="passwordConf">
									<Col componentClass={ControlLabel} sm={2}>
										Confirm password
									</Col>
									<Col sm={8}>
										<FormControl
											inputRef={ref => { this.passwordConf = ref } }
											type="passwordConf"
											placeholder="Confirm password" />
									</Col>
								</FormGroup>
								{signupErrorMessage &&
									<Col smOffset={2} sm={8}>
										<Alert bsStyle="danger">{signupErrorMessage}</Alert>
									</Col>
			          }
								<FormGroup>
									<Col smOffset={2} sm={8}>
										<Button type='submit'
					            onClick={(event) => this.handleClick(event)}>
					            Signup
					          </Button>
									</Col>
								</FormGroup>
								</Form>
			      </div>
					</Panel.Body>
				</Panel>
			</Container>
    )
	}
}

Signup.propTypes = {
  errorMessage: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

export default Signup
