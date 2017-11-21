import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import NavigationBar from './nav/NavigationBar'
import Map from './maps/Map'
import Graph from './add_restaurant/AddRestaurant'
import Login from './user/Login'
import Signup from './user/Signup'

class Home extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
    const { dispatch, quote, isAuthenticated, errorMessage} = this.props
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
                   dispatch={dispatch} />
            ) }/>
            <Route path='/graph' component={Graph} />
            <Route path='/signup' render={ (props) => (
              <Signup
                history={props.history}
                dispatch={dispatch}
                errorMessage={errorMessage} />
            ) }/>
            <Route path='/login' render={ (props) => (
              <Login
                history={props.history}
                dispatch={dispatch}
                errorMessage={errorMessage} />
            ) }/>
          </div>
        </Router>
      </div>
    )
	}
}


Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  quote: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  username: PropTypes.string
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

  const { quotes, auth } = state
  const { quote, authenticated } = quotes
  const { isAuthenticated, errorMessage, username } = auth

  return {
    quote,
    isAuthenticated,
    errorMessage,
    username
  }
}


export default connect(mapStateToProps)(Home)
