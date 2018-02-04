import React from 'react'
import RestaurantItem from './RestaurantItem'
import { Container, Item } from 'semantic-ui-react'

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
	      	<Item.Group>
	      		{restaurants}
	      	</Item.Group>
    )
	}
}

export default RestaurantScroll
