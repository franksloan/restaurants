import React from 'react'
import { Button, ListGroupItem, Panel, Form, FormGroup, FormControl, ControlLabel, Glyphicon } from 'react-bootstrap'
import AddSearchResultForm from './AddSearchResultForm'

class RestaurantItem extends React.Component {
	constructor(){
		super()
		this.toggleReview = this.toggleReview.bind(this)
		this.openLinkInMap = this.openLinkInMap.bind(this)
		this.state = {
			showReview: false
		}
	}

	toggleReview(e){
		this.setState({
			showReview: !this.state.showReview
		})
	}

	openLinkInMap(e){
  	window.open("https://www.google.com/maps/search/?api=1&query="+
										this.props.restaurant.position.lat+","+
										this.props.restaurant.position.lng+"&query_place_id="+
										this.props.restaurant.googleId);
	}

	render(){
		let restaurant = this.props.restaurant
		let showReview = this.state.showReview
		return (
        <div>
	      <ListGroupItem onClick={this.props.onItemClick} style={{padding: '2%'}}>
					<Panel bsStyle="primary" style={{margin: '0%'}}>
				    <Panel.Heading>
				      <Panel.Title componentClass="h3">
								<a href={restaurant.link} >
									{restaurant.name}
								</a>
							</Panel.Title>
							<Button className="pull-right" onClick={this.toggleReview}>
								{!showReview &&
									<Glyphicon glyph="pencil" />
								}
								{showReview &&
									<Glyphicon glyph="remove" />
								}
							</Button>
				    </Panel.Heading>
				    <Panel.Body>
							<p><b>Rating on google: </b>{restaurant.googleRating}</p>
              <p onClick={this.openLinkInMap}><b>Address: </b><a>{restaurant.address}</a></p>
							{showReview &&
	              <AddSearchResultForm
	                infoFromGoogle={restaurant}
	                clearResults={this.props.clearResults}
	                saveRestaurant={this.props.save}
	                categories={this.props.categories}
									errorMessage={this.props.errorMessage} />
        			}
						</Panel.Body>
				  </Panel>
	      </ListGroupItem>
        </div>
    )
	}
}

export default RestaurantItem
