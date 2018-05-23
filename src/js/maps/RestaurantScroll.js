import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import ScrollItem from './../scroll/ScrollItem'

// Creates scrolling list of restaurants
let create = RestaurantItem => class extends React.Component {
	constructor(){
		super()
	}

	render(){
		let restaurantsList = this.props.restaurantsList
		let restaurants = restaurantsList.map( (restaurant) =>
			<ScrollItem
					key={restaurant.id}
					restaurant={restaurant}
					onRestaurantClick={this.props.onRestaurantClick}
					googleRestaurantMarkers={this.props.googleRestaurantMarkers}>
					<RestaurantItem
						restaurant={restaurant}
						onRestaurantClick={this.props.onRestaurantClick}
						activeMarker={this.props.activeMarker}
						showInfoWindow={this.props.showInfoWindow}
						selectedRestaurant={this.props.selectedRestaurant}
						googleRestaurantMarkers={this.props.googleRestaurantMarkers}
						clearResults={this.props.clearResults}
						save={this.props.save}
						categories={this.props.categories}
						errorMessage={this.props.errorMessage} />
				</ScrollItem>
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
