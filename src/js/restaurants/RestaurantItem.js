import React from 'react'
import { Button, ListGroupItem, Panel, Glyphicon } from 'react-bootstrap'
import AddReviewForm from './AddReviewForm'
import ScrollItem from './../scroll/ScrollItem'

class RestaurantItem extends React.Component {
	constructor(){
		super()
		this.toggleReview = this.toggleReview.bind(this)
		this.state = {
			showReview: false
		}
	}

	toggleReview(e){
		this.setState({
			showReview: !this.state.showReview
		})
	}


	render(){

		const showReview = this.state.showReview
		let restaurant = this.props.restaurant
		let groupAverage = restaurant.reviews
							.map(review => {
								return review.rating
							})
							.reduce((a,b) => a + b, 0)/restaurant.reviews.length
		return (
			<div onClick={this.props.onItemClick}>
	      <ListGroupItem >
					<Panel bsStyle="primary">
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
							<p><b>Category: </b>{restaurant.category}</p>
							<p><b>Google: </b>{restaurant.googleRating}</p>
							<p><b>Group rating: </b>{groupAverage}</p>
							<p><b>Address: </b>{restaurant.address}</p>
							{showReview &&
								<AddReviewForm
									restaurantId={restaurant.id}
									restaurantName={restaurant.name}
	                clearResults={this.props.clearResults}
	                saveReview={this.props.save}
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
