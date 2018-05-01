import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, FormControl, ControlLabel, Col, Alert, Panel, Checkbox } from 'react-bootstrap'
import { submitNewPassword } from './actions'
import Container from '../utilities/Container'

class ResetPassword extends React.Component {
	constructor(){
		super()
    this.handleClick = this.handleClick.bind(this)
	}


  handleClick(e){
		e.preventDefault()
		if(this.password.value.trim() !== this.passwordConf.value.trim()){
			console.log('Passwords are not equal')
			return
		}
    const creds = {
			email: this.email.value.trim(),
			password: this.password.value.trim()
		}
    return this.props.dispatch(submitNewPassword(creds, this.props.history))
  }


	render(){
    const { history, submitNewPasswordErrorMessage } = this.props
		console.log(history.location.pathname)
		return (
      <Container>
				<Panel>
					<Panel.Heading>
						New password
					</Panel.Heading>
					<Panel.Body>
						<Form horizontal>
							  <FormGroup controlId="email">
									<Col componentClass={ControlLabel} sm={2}>
										 Email
									</Col>
									<Col sm={8}>
										<FormControl
											inputRef={ref => { this.email = ref } }
											type="email"
											placeholder="Email" />
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
											type="password"
											placeholder="" />
									</Col>
								</FormGroup>

								{submitNewPasswordErrorMessage &&
									<Col smOffset={2} sm={8}>
			            	<Alert bsStyle="danger">{submitNewPasswordErrorMessage}</Alert>
									</Col>
			          }
								<FormGroup>
									<Col smOffset={2} sm={8}>
										<Button type='submit'
					            onClick={(event) => this.handleClick(event)}>
					             Submit
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

ResetPassword.propTypes = {
  submitNewPasswordErrorMessage: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

export default ResetPassword
