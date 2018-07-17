import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GoogleMap from './../map/GoogleMap'
import ScrollingList from './../scroll/ScrollingList'
import RestaurantItem from './RestaurantItem'
import { Button } from 'react-bootstrap'
import { addMarker, loadRestaurants, onRestaurantClick, clearMarkers, saveReview } from './actions'
import Container from '../utilities/Container'

class Map extends React.Component {
	constructor(){
		super()
	}

	componentWillMount() {
	  this.props.loadRestaurants();
	}

	render(){
		let AppRestaurantScroll = ScrollingList.create(RestaurantItem)
		return (
				<div style={{width: '100%', overflow:'auto'}}>
					<Container paddingSide='1.5%' paddingTop='60px'>
						<AppRestaurantScroll
							restaurantsList={this.props.restaurantsList}
							googleRestaurantMarkers={this.props.googleRestaurantMarkers}
							onRestaurantClick={this.props.onRestaurantClick}
							showInfoWindow={this.props.showInfoWindow}
							activeMarker={this.props.activeMarker}
							selectedRestaurant={this.props.selectedRestaurant}
							save={this.props.saveReview}
							errorMessage={this.props.saveReviewErrorMessage} />
					</Container>
					<Container float='right'>
	          	<GoogleMap
	          		addMarker={this.props.addMarker}
	          		restaurantsList={this.props.restaurantsList}
	          		googleRestaurantMarkers={this.props.googleRestaurantMarkers}
	          		onRestaurantClick={this.props.onRestaurantClick}
	          		showInfoWindow={this.props.showInfoWindow}
	          		activeMarker={this.props.activeMarker}
	          		selectedRestaurant={this.props.selectedRestaurant}
								clearMarkers={this.props.clearMarkers} />
	        </Container>
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
        ...bindActionCreators({ addMarker, loadRestaurants,
					onRestaurantClick, clearMarkers, saveReview }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
