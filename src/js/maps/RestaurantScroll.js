import React from 'react'
import RestaurantItem from './RestaurantItem'
// import { Container, Item } from 'semantic-ui-react'
import { Button, ListGroup } from 'react-bootstrap'

// Creates scrolling list of restaurants
class RestaurantScroll extends React.Component {
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
					googleRestaurantMarkers={this.props.googleRestaurantMarkers} />
			)
		return (
	      	<ListGroup>
	      		{restaurants}
	      	</ListGroup>
    )
	}
}

export default RestaurantScroll
