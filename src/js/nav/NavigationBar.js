import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { logoutUser } from '../user/actions'

class NavigationBar extends React.Component {
	constructor(){
		super()
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.state = {
      activeItem: 'home'
    }
	}

  handleItemClick(e, {name}){
    this.setState({ activeItem: name })
  }


  handleLogout(e, {name}){
    this.setState({ activeItem: 'home' })
    this.props.dispatch(logoutUser())
  }


	render(){
    const { isAuthenticated, dispatch } = this.props

    const activeItem = this.state.activeItem
		return (
      <div>
        <Menu>
          <Menu.Item
            as={Link}
            to='/'
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            Home
          </Menu.Item>

          <Menu.Item
            as={Link}
            to='/map'
            name='map'
            active={activeItem === 'map'}
            onClick={this.handleItemClick}
          >
            Map
          </Menu.Item>

          <Menu.Item
            as={Link}
            to='/graph'
            name='graph'
            active={activeItem === 'graph'}
            onClick={this.handleItemClick}
          >
            Graph
          </Menu.Item>
          <Menu.Menu position='right'>
            {!isAuthenticated &&
              <Menu.Item 
                as={Link}
                to='/signup'
                name='signup' 
                active={activeItem === 'signup'} 
                onClick={this.handleItemClick} />
            }
            {!isAuthenticated &&
              <Menu.Item
                as={Link}
                to='/login'
                name='login'
                active={activeItem === 'login'} 
                onClick={this.handleItemClick} />
            }
            {isAuthenticated &&
              <Menu.Item 
                name='logout'
                to='/'
                active={activeItem === 'logout'} 
                onClick={this.handleLogout}>
                Logout
              </Menu.Item>
            }
          </Menu.Menu>
        </Menu>
      </div>
    )
	}
}

NavigationBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default NavigationBar
