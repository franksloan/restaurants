import React from 'react'
import { Item , Icon, Label } from 'semantic-ui-react'

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
	  let match_list = this.props.restaurantMarkers.filter(item => {
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
		return (
	      <Item style={this.state.style} onClick={this.onItemClick}>
	      	<Item.Content style={{padding: "10px"}}>
	      		<Item.Header><a href={restaurant.link}>{restaurant.name}</a></Item.Header>
		      	<Item.Meta>Rating: {restaurant.averageRating}</Item.Meta>
		      	<Item.Meta><Icon name='heart' color='red'/>
		      		<Label>Naomi</Label>
		      		<Label>Frank</Label>
		      	</Item.Meta>
		      	<Item.Content>{restaurant.address}</Item.Content>
	      	</Item.Content>
	      </Item>
    )
	}
}

export default RestaurantItem
