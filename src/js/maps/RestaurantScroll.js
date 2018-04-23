import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'

// Creates scrolling list of restaurants
let create = RestaurantItem => class extends React.Component {
	constructor(){
		super()
	}

	render(){
		let restaurantsList = this.props.restaurantsList
		let restaurants = restaurantsList.map( (restaurant) =>
				<RestaurantItem
					key={restaurant.id}
					restaurant={restaurant}
					onRestaurantClick={this.props.onRestaurantClick}
					activeMarker={this.props.activeMarker}
					showInfoWindow={this.props.showInfoWindow}
					selectedRestaurant={this.props.selectedRestaurant}
					googleRestaurantMarkers={this.props.googleRestaurantMarkers}
					clearResults={this.props.clearResults}
					saveRestaurant={this.props.saveRestaurant}
					categories={this.props.categories} />
			)
		return (
	      	<ListGroup>
	      		{restaurants}
	      	</ListGroup>
    )
	}
}

let RestaurantScroll = {
	create: create
}

export default RestaurantScroll
