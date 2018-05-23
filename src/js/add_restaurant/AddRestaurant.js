import React from 'react'
import { Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import StickyBox from 'react-sticky-box'
import GoogleMap from '../maps/GoogleMap'
import RestaurantScroll from '../maps/RestaurantScroll'
import SearchResult from './SearchResult'
import { searchForRestaurant, addSearchMarker, getCategories,
				 onSearchResultClick, clearResults, saveNewRestaurant } from './actions'
import Container from '../utilities/Container'

class AddRestaurant extends React.Component {
	constructor(){
		super()
		this.searchForRestaurant = this.searchForRestaurant.bind(this)
	}


	componentDidMount(){
		this.props.getCategories()
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
					<div style={{float:'left', width: '50%'}}>
						<Container>
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
								save={this.props.saveNewRestaurant}
								categories={this.props.categories}
								errorMessage={this.props.saveRestaurantErrorMessage} />
							</Container>
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
					onSearchResultClick, clearResults, saveNewRestaurant, getCategories
				}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurant)
