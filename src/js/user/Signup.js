import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, FormControl, ControlLabel, Col, Panel, Alert } from 'react-bootstrap'
import { signupUser } from './actions'
import Container from '../utilities/Container'

class Signup extends React.Component {
	constructor(){
		super()
    this.handleClick = this.handleClick.bind(this)
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
			<Container>
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
