import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom'
import NavigationBar from './nav/NavigationBar'
import Map from './maps/Map'
import AddRestaurant from './add_restaurant/AddRestaurant'
import Login from './user/Login'
import Signup from './user/Signup'
import Thanks from './user/Thanks'
import AlreadyAuthenticated from './user/AlreadyAuthenticated'
import EmailNotice from './user/EmailNotice'
import ResetPassword from './user/ResetPassword'

class Home extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
    const { dispatch, isAuthenticated, loginErrorMessage, signupErrorMessage,
			resetPasswordErrorMessage, submitNewPasswordErrorMessage, username } = this.props
		return (
      <div>
        <Router >
          <div>
            <NavigationBar
              dispatch={dispatch}
              isAuthenticated= {isAuthenticated}/>
            <Route path='/' path="/(:filter)"/>
            <Route path='/map' render={ (props) => (
              <Map
                   dispatch={dispatch}
									 username= {username} />
            ) }/>
            <Route path='/add_restaurant' render={ (props) => (
              <AddRestaurant
                dispatch={dispatch}
								username= {username} />
            ) }/>
            <Route path='/signup' render={ (props) => (
              <Signup
                history={props.history}
                dispatch={dispatch}
                signupErrorMessage={signupErrorMessage} />
            ) }/>
            <Route path='/login' render={ (props) => (
              <Login
                history={props.history}
                dispatch={dispatch}
                loginErrorMessage={loginErrorMessage}
								resetPasswordErrorMessage={resetPasswordErrorMessage} />
            ) }/>
						<Route path='/email' render={ () => <EmailNotice /> }/>
						<Route path='/thanks' render={ () => <Thanks /> }/>
						<Route path='/already_authenticated' render={ () => <AlreadyAuthenticated /> }/>
						<Route path='/reset_password' render={ (props) => (
							<ResetPassword
								history={props.history}
								dispatch={dispatch}
                submitNewPasswordErrorMessage={submitNewPasswordErrorMessage} />
						)}/>
          </div>
        </Router>
      </div>
    )
	}
}


Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loginErrorMessage: PropTypes.string,
	signupErrorMessage: PropTypes.string,
	resetPasswordErrorMessage: PropTypes.string,
	submitNewPasswordErrorMessage: PropTypes.string,
  username: PropTypes.string,
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

  const { user } = state
  const { isAuthenticated, loginErrorMessage, signupErrorMessage, submitNewPasswordErrorMessage, username } = user

  return {
    isAuthenticated,
    loginErrorMessage,
		signupErrorMessage,
		submitNewPasswordErrorMessage,
    username,
  }
}


export default connect(mapStateToProps)(Home)
