import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logoutUser } from '../user/actions'

class NavigationBar extends React.Component {
	constructor(){
		super()
    this.handleLogout = this.handleLogout.bind(this)
	}


  handleLogout(e){
    this.props.dispatch(logoutUser())
  }


	render(){
    const { isAuthenticated, dispatch } = this.props
		return (
      <div>
				<Navbar inverse collapseOnSelect>
					<LinkContainer to='/'>
					  <Navbar.Header>
					    <Navbar.Brand
		            title='home' >
					      Home
					    </Navbar.Brand>
					    <Navbar.Toggle />
					  </Navbar.Header>
					</LinkContainer>
				  <Navbar.Collapse>
			    <Nav>
					  <LinkContainer to='/map'>
				      <NavItem
								title='map'>
				        Map
				      </NavItem>
						</LinkContainer>
						<LinkContainer to='/add_restaurant'>
				      <NavItem
								title='add_restaurant'>
				        Add restaurant
				      </NavItem>
						</LinkContainer>
			    </Nav>
			    <Nav pullRight>
						{!isAuthenticated &&
						  <LinkContainer to='/signup'>
					      <NavItem
									title='signup'>
					        Signup
					      </NavItem>
						  </LinkContainer>
						}
						{!isAuthenticated &&
							<LinkContainer to='/login'>
					      <NavItem
									title='login'>
					        Login
					      </NavItem>
						  </LinkContainer>
						}
						{isAuthenticated &&
							<LinkContainer to='/logout'>
					      <NavItem
									title='logout'
									onClick={this.handleLogout}>
					        Logout
					      </NavItem>
						  </LinkContainer>
						}
			    </Nav>
			  	</Navbar.Collapse>
				</Navbar>
      </div>
    )
	}
}

NavigationBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default NavigationBar
