import React from 'react'
import { Button, ListGroupItem, Panel } from 'react-bootstrap'

class RestaurantItem extends React.Component {
	constructor(){
		super()
		this.onItemClick = this.onItemClick.bind(this)
		this.getMarker = this.getMarker.bind(this)
		this.state = {
			style: {border: null}
		}
	}


	// If the active marker that has been clicked on is different
	// and it is this restaurant then highlight it
	componentDidUpdate(prevProps, prevState){
		if (this.props.activeMarker !== prevProps.activeMarker) {
			if (this.props.showInfoWindow && (this.props.selectedRestaurant === this.props.restaurant.name)) {
				this.setState({
					style: {backgroundColor: "grey"}
				})
			} else {
				this.setState({
					style: {backgroundColor: null}
				})
			}
		}
	}

	onItemClick(){
		let restaurantMarker = this.getMarker(this.props.restaurant.name)

		if(restaurantMarker){
			this.props.onRestaurantClick(this.props.restaurant.name, restaurantMarker)
		} else {
			console.error("The marker for " + this.props.restaurant.name + " is not correctly displayed on map")
		}
	}


	getMarker(restaurantName) {
	  let match_list = this.props.googleRestaurantMarkers.filter(item => {
	    return item.title === restaurantName
	  })
	  if (match_list) {
	    return match_list[0]
	  }
	  else {
	    return null;
	  }
	}


	render(){
		let restaurant = this.props.restaurant

		let groupAverage = restaurant.reviews
							.map(review => {
								return review.rating
							})
							.reduce((a,b) => a + b, 0)/restaurant.reviews.length
		return (
	      <ListGroupItem style={this.state.style} onClick={this.onItemClick}>
					<Panel bsStyle="primary">
				    <Panel.Heading>
				      <Panel.Title componentClass="h3">
								<a href={restaurant.link} >
									{restaurant.name}
								</a>
							</Panel.Title>
				    </Panel.Heading>
				    <Panel.Body>
							<p><b>Category: </b>{restaurant.category}</p>
							<p><b>Google: </b>{restaurant.googleRating}</p>
							<p><b>Group rating: </b>{groupAverage}</p>
							<p><b>Address: </b>{restaurant.address}</p>
						</Panel.Body>
				  </Panel>
	      </ListGroupItem>
    )
	}
}

export default RestaurantItem
