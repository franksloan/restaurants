import React from 'react'
import { Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import StickyBox from 'react-sticky-box'
import GoogleMap from '../maps/GoogleMap'
import RestaurantScroll from '../maps/RestaurantScroll'
import SearchResult from './SearchResult'
import { searchForRestaurant, addSearchMarker,
				 onSearchResultClick, clearResults, saveNewRestaurant } from './actions'

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
		let GoogleRestaurantScroll = RestaurantScroll.create(SearchResult)
		return (
				<div style={{width: '100%', overflow:'auto'}}>
					<div style={{float:'left', width: '50%', paddingTop: '10%', paddingLeft:'1.5%', paddingRight:'1.5%'}}>
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
						<GoogleRestaurantScroll
							restaurantsList={this.props.searchResults}
							googleRestaurantMarkers={this.props.googleSearchMarkers}
							onRestaurantClick={this.props.onSearchResultClick}
							showInfoWindow={this.props.showSearchResultWindow}
							activeMarker={this.props.activeSearchMarker}
							selectedRestaurant={this.props.selectedSearchResult}
							clearResults={this.props.clearResults}
							saveRestaurant={this.props.saveNewRestaurant} />
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
        ...bindActionCreators({ searchForRestaurant, addSearchMarker,
					onSearchResultClick, clearResults, saveNewRestaurant}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurant)
