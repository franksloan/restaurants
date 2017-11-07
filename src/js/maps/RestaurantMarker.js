import React from 'react'
import { Marker } from 'google-maps-react'

class RestaurantMarker extends React.Component {
	constructor(props){
		super()
		this.onMarkerClick = this.onMarkerClick.bind(this)
	}


	// If the active marker that has been clicked on is different
	// and it is this restaurant then highlight it
	componentWillMount(prevProps, prevState){	

		this.marker = (<Marker 
	          position={this.props.restaurant.position}
	          name={this.props.restaurant.name}
	          icon={{url: "/images/icons8-marker.png"}}
	          onClick={this.onMarkerClick} />)

		this.props.addMarker(this.marker)
	}


	onMarkerClick(markerProps, marker){
	  this.props.onRestaurantClick(markerProps.name, marker)
	}


	render(){
		let marker = this.marker
		return (
			{marker}
    	)
	}
}

export default RestaurantMarker
