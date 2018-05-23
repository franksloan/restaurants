import { fetchFromEndpoint } from './../utilities/restService'

export const SELECT_RESTAURANT = 'SELECT_RESTAURANT'
export const ADD_MARKER = 'ADD_MARKER'
export const LOAD_RESTAURANTS = 'LOAD_RESTAURANTS'
export const CLEAR_MARKERS = 'CLEAR_MARKERS'
export const SAVE_REVIEW_ERROR = 'SAVE_REVIEW_ERROR'

export function onRestaurantClick(restaurant, marker) {
  return {
    type: SELECT_RESTAURANT,
    showInfoWindow: true,
    activeMarker: marker,
    selectedRestaurant: restaurant
  }
}

export function addMarker(marker){
  return {
    type: ADD_MARKER,
    marker
  }
}

export function clearMarkers(){
  return {
    type: CLEAR_MARKERS
  }
}

function addRestaurants(jsonData){
  let restaurants = jsonData.restaurants
  return {
    type: LOAD_RESTAURANTS,
    restaurants
  }
}

export function loadRestaurants() {

  let config = {
    method: 'GET',
    headers: { 'Content-Type':'application/json' }
  }

  return dispatch => {

    return fetchFromEndpoint('http://localhost:5050/get_restaurants',
                  config, ()=> {console.error('Could not retrieve restaurants')},
                  addRestaurants, [], '/', dispatch)

  }
}


function saveReviewError(message){
  return {
    type: SAVE_REVIEW_ERROR,
    message
  }
}


export function saveReview(item) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json'},
    body: JSON.stringify(item)
  }

  return dispatch => {

    return fetchFromEndpoint('http://localhost:5050/add_review',
                  config, saveReviewError , loadRestaurants, history, null, dispatch)
  }
}
