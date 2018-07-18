import React from 'react'
import { Button, Form, FormGroup, FormControl, ControlLabel, InputGroup, Glyphicon } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GoogleMap from './../map/GoogleMap'
import ScrollingList from '../scroll/ScrollingList'
import SearchResult from './SearchResult'
import { searchForRestaurant, addSearchMarker, getCategories,
				 onSearchResultClick, clearResults, saveNewRestaurant } from './actions'
import Container from '../utilities/Container'

class AddRestaurant extends React.Component {
	constructor(){
		super()
		this.searchForRestaurant = this.searchForRestaurant.bind(this)
		this.handleKeyPress = this.handleKeyPress.bind(this)
	}


	componentDidMount(){
		this.props.getCategories()
	}


	handleKeyPress(e){
		if(e.key == 'Enter'){
			e.preventDefault()
    	console.log('enter press here! ')
			this.searchForRestaurant()
  	}
	}


	// Calls google search API to find a restaurant and load the results into searchResults prop
	searchForRestaurant(e){
		console.log(this.searchTerm.value.trim())
		this.props.clearResults()
		this.props.searchForRestaurant(this.searchTerm.value.trim())
	}


	render(){
		let GoogleRestaurantScroll = ScrollingList.create(SearchResult)
		return (
				<div style={{width: '100%', overflow:'auto'}}>
					<Container paddingSide='1.5%' width='50%' float='left'>
						<Container paddingTop='0px' width='100%'>
							<FormGroup>
							  <InputGroup onKeyPress={this.handleKeyPress}>
									<FormControl
										type="text"
										inputRef={ref => { this.searchTerm = ref } }
										placeholder="Type a restaurant to search..."/>
									<InputGroup.Button>
										<Button onClick={this.searchForRestaurant}>
						        	Search
										</Button>
						      </InputGroup.Button>
							  </InputGroup>
							</FormGroup>
						</Container>
						<Container paddingTop='0px' width='100%'>
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
					</Container>
					<Container paddingTop='50px' float='right' width='50%'>
							<GoogleMap
	          		addMarker={this.props.addSearchMarker}
	          		restaurantsList={this.props.searchResults}
	          		googleRestaurantMarkers={this.props.googleSearchMarkers}
	          		onRestaurantClick={this.props.onSearchResultClick}
	          		showInfoWindow={this.props.showSearchResultWindow}
	          		activeMarker={this.props.activeSearchMarker}
	          		selectedRestaurant={this.props.selectedSearchResult}
								clearMarkers={this.props.clearResults} />
        	</Container>
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
