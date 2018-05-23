import React from 'react'

class ScrollItem extends React.Component {
	constructor(){
		super()
		this.onItemClick = this.onItemClick.bind(this)
		this.getMarker = this.getMarker.bind(this)
	}


	onItemClick(){
		let restaurantMarker = this.getMarker(this.props.restaurant.name)

		if(restaurantMarker){
			this.props.onRestaurantClick(this.props.restaurant, restaurantMarker)
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
		return (
			<div onClick={this.onItemClick}>
				{this.props.children}
			</div>
    )
	}
}

export default ScrollItem
