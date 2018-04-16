import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GoogleMap from './GoogleMap'
import RestaurantScroll from './RestaurantScroll'
import RestaurantItem from './RestaurantItem'
import { Button } from 'react-bootstrap'
import { addMarker, loadRestaurants, onRestaurantClick, clearMarkers } from './actions'

class Map extends React.Component {
	constructor(){
		super()
		this.toggleVisibility = this.toggleVisibility.bind(this)
		this.state = {
			visible: true,
			id2: Math.random() * 10
		}
	}

	componentWillMount() {
	    this.props.loadRestaurants();
	}

	toggleVisibility(){
		this.setState({ visible: !this.state.visible })
	}

	render(){
		let AppRestaurantScroll = RestaurantScroll.create(RestaurantItem)
		return (
				<div style={{width: '100%', overflow:'auto'}}>
					<div style={{float:'left', width: '50%', paddingTop: '10%', paddingLeft:'1.5%', paddingRight:'1.5%'}}>
						<AppRestaurantScroll
							restaurantsList={this.props.restaurantsList}
							googleRestaurantMarkers={this.props.googleRestaurantMarkers}
							onRestaurantClick={this.props.onRestaurantClick}
							showInfoWindow={this.props.showInfoWindow}
							activeMarker={this.props.activeMarker}
							selectedRestaurant={this.props.selectedRestaurant} />
					</div>
					<div style={{float: 'right', width: '50%'}}>
	          	<GoogleMap
	          		addMarker={this.props.addMarker}
	          		restaurantsList={this.props.restaurantsList}
	          		googleRestaurantMarkers={this.props.googleRestaurantMarkers}
	          		onRestaurantClick={this.props.onRestaurantClick}
	          		showInfoWindow={this.props.showInfoWindow}
	          		activeMarker={this.props.activeMarker}
	          		selectedRestaurant={this.props.selectedRestaurant}
								clearMarkers={this.props.clearMarkers} />
	        </div>
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
        ...bindActionCreators({ addMarker, loadRestaurants, onRestaurantClick, clearMarkers }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
