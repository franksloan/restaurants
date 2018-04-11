import React from 'react'
import { Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GoogleMap from '../maps/GoogleMap'
import RestaurantScroll from '../maps/RestaurantScroll'
import { searchForRestaurant, addSearchMarker, onSearchResultClick, clearResults } from './actions'

class AddRestaurant extends React.Component {
	constructor(){
		super()
		this.searchForRestaurant = this.searchForRestaurant.bind(this)
	}


	// Calls google search API to find a restaurant and load the results into searchResults prop
	searchForRestaurant(e){
		e.preventDefault()
		this.props.clearResults()
		this.props.searchForRestaurant(this.searchTerm.value.trim())
	}


	render(){

		return (
				<div style={{width: '100%', overflow:'auto'}}>
					<div style={{float:'left', width: '50%'}}>
						<Form inline onSubmit={this.searchForRestaurant} >
						  <FormGroup controlId="formInlineName">
						    <ControlLabel>Search</ControlLabel>{' '}
						    <FormControl
									type="text"
									inputRef={ref => { this.searchTerm = ref } }
									placeholder="Padella" />
						  </FormGroup>{' '}
						  <Button type="submit">
								Search
							</Button>
						</Form>
						<RestaurantScroll
							restaurantsList={this.props.searchResults}
							googleRestaurantMarkers={this.props.googleSearchMarkers}
							onRestaurantClick={this.props.onSearchResultClick}
							showInfoWindow={this.props.showSearchResultWindow}
							activeMarker={this.props.activeSearchMarker}
							selectedRestaurant={this.props.selectedSearchResult} />
					</div>
					<div style={{float: 'right', width: '50%'}}>
	          	<GoogleMap
	          		addMarker={this.props.addSearchMarker}
	          		restaurantsList={this.props.searchResults}
	          		googleRestaurantMarkers={this.props.googleSearchMarkers}
	          		onRestaurantClick={this.props.onSearchResultClick}
	          		showInfoWindow={this.props.showSearchResultWindow}
	          		activeMarker={this.props.activeSearchMarker}
	          		selectedRestaurant={this.props.selectedSearchResult}
								clearMarkers={this.props.clearResults} />
	        </div>
	      </div>
		)
	}
}

function mapStateToProps(state) {
  const { add_restaurant } = state

  return add_restaurant
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ searchForRestaurant, addSearchMarker, onSearchResultClick, clearResults}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurant)
