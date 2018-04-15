import React from 'react'
import { Button, ListGroupItem, Panel, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class RestaurantItem extends React.Component {
	constructor(){
		super()
		this.onItemClick = this.onItemClick.bind(this)
		this.getMarker = this.getMarker.bind(this)
    this.submitRestaurant = this.submitRestaurant.bind(this)
	}


  submitRestaurant(){
    console.log('Added with rating - ' + this.rating)
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
    console.log(this.props.selectedRestaurant)
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
            <Panel bsStyle="info">
              <Panel.Heading>
                <Panel.Title componentClass="h3">
                   Your review
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
  							<Form inline onSubmit={this.submitRestaurant} >
                    <FormGroup controlId="category">
                      <ControlLabel>Select</ControlLabel>
                      <FormControl componentClass="select" placeholder="select">
                        <option>select</option>
                        <option value="Italian">Italian</option>
                        <option value="European">European</option>
                      </FormControl>
                    </FormGroup>
                    <FormGroup controlId="rating">
                      <ControlLabel>Rating</ControlLabel>{' '}
      						    <FormControl
      									type="text"
      									inputRef={ref => { this.rating = ref } }
      									placeholder="7.5" />
                    </FormGroup>{' '}
                    <FormGroup controlId="review">
                    <ControlLabel>Details</ControlLabel>{' '}
                    <FormControl
      									type="text"
      									inputRef={ref => { this.review = ref } }
      									placeholder="....." />
    						    </FormGroup>{' '}
    						  <Button type="submit" >Add</Button>
    						</Form>
  						</Panel.Body>
            </Panel>
          }
        </div>
    )
	}
}

export default RestaurantItem
