import {
  ADD_MARKER, LOAD_RESTAURANTS, SELECT_RESTAURANT, CLEAR_MARKERS, SAVE_REVIEW_ERROR
} from './actions'
import React from 'react'

// The maps reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function maps(state = {
    googleRestaurantMarkers: [],
    restaurantsList: []
  }, action) {
  switch (action.type) {
    case ADD_MARKER:
      let googleRestaurantMarkers = state.googleRestaurantMarkers
      googleRestaurantMarkers.push(action.marker)

      return Object.assign({}, state, {
        googleRestaurantMarkers: googleRestaurantMarkers
      })
    case CLEAR_MARKERS:
      if(state.googleRestaurantMarkers){
        state.googleRestaurantMarkers.forEach(marker => marker.setMap(null))
      }
      return Object.assign({}, state, {
        googleRestaurantMarkers: [],
        activeMarker: null,
        showInfoWindow: false,
        selectedRestaurant: null
      })
    case LOAD_RESTAURANTS:
      return Object.assign({}, state, {
        restaurantsList: action.restaurants
      })
    case SELECT_RESTAURANT:
      return Object.assign({}, state, {
        activeMarker: action.activeMarker,
        showInfoWindow: action.showInfoWindow,
        selectedRestaurant: action.selectedRestaurant
      })
    case SAVE_REVIEW_ERROR:
      return Object.assign({}, state, {
        saveReviewErrorMessage: action.message
      })
    default:
      return state
  }
}
