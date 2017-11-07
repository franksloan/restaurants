import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import GoogleApiWrapper from './GoogleApiWrapper'
import RestaurantScroll from './RestaurantScroll'
import { Sidebar, Button} from 'semantic-ui-react'
import { addMarker, loadRestaurants, onRestaurantClick } from './actions'

class Map extends React.Component {
	constructor(){
		super()
		this.toggleVisibility = this.toggleVisibility.bind(this)
		// this.onRestaurantClick = this.onRestaurantClick.bind(this)
		this.state = {
			visible: true
		}
	}

	componentWillMount() {
	    this.props.loadRestaurants();
	}

  	toggleVisibility(){
  		this.setState({ visible: !this.state.visible })
  	}

  	// Executed when a marker is clicked on
  	// marker props, component
  	// onRestaurantClick(restaurantName, marker) {
  	//   this.setState({
  	//     selectedRestaurant: restaurantName,
  	//     activeMarker: marker,
  	//     showInfoWindow: true
  	//   });
  	// }

	render(){
		const { visible } = this.state
		return (
	      <div>
		  	<Sidebar.Pushable>
	          <Sidebar
	            animation='overlay'
	            width='very wide'
	            direction='right'
	            visible={visible}
	            icon='labeled'
	          >
	          	<GoogleApiWrapper 
	          		addMarker={this.props.addMarker}
	          		restaurantsList={this.props.restaurantsList}
	          		restaurantMarkers={this.props.restaurantMarkers}
	          		onRestaurantClick={this.props.onRestaurantClick}
	          		showInfoWindow={this.props.showInfoWindow}
	          		activeMarker={this.props.activeMarker}
	          		selectedRestaurant={this.props.selectedRestaurant} />
	          </Sidebar>
	          <Sidebar.Pusher>
	            <RestaurantScroll 
	            	restaurantsList={this.props.restaurantsList}
	            	restaurantMarkers={this.props.restaurantMarkers}
	            	onRestaurantClick={this.props.onRestaurantClick}
	            	showInfoWindow={this.props.showInfoWindow}
	            	activeMarker={this.props.activeMarker}
	            	selectedRestaurant={this.props.selectedRestaurant} />
	          </Sidebar.Pusher>
	        </Sidebar.Pushable>	
	      </div>
    	)
	}
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {
  
  const { maps } = state

  return maps
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ addMarker, loadRestaurants, onRestaurantClick }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
