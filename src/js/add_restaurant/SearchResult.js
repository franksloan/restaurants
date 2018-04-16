import React from 'react'
import { Button, ListGroupItem, Panel, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import AddSearchResultForm from './AddSearchResultForm'

class RestaurantItem extends React.Component {
	constructor(){
		super()
		this.onItemClick = this.onItemClick.bind(this)
		this.getMarker = this.getMarker.bind(this)
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
		return (
        <div>
	      <ListGroupItem onClick={this.onItemClick} style={{padding: '2%'}}>
					<Panel bsStyle="primary" style={{margin: '0%'}}>
				    <Panel.Heading>
				      <Panel.Title componentClass="h3">
								<a href={restaurant.link} >
									{restaurant.name}
								</a>
							</Panel.Title>
				    </Panel.Heading>
				    <Panel.Body>
							<p><b>Rating on google: </b>{restaurant.googleRating}</p>
              <p><b>Address: </b>{restaurant.address}</p>
						</Panel.Body>
				  </Panel>
	      </ListGroupItem>
        {this.props.selectedRestaurant == restaurant.name &&
              <AddSearchResultForm
                infoFromGoogle={restaurant}
                clearResults={this.props.clearResults}
                saveRestaurant={this.props.saveRestaurant} />
        }
        </div>
    )
	}
}

export default RestaurantItem
