import {
  ADD_MARKER, LOAD_RESTAURANTS, SELECT_RESTAURANT, CLEAR_MARKERS
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
      state.googleRestaurantMarkers[0].setMap(null)
      return Object.assign({}, state, {
        googleRestaurantMarkers: [],
        activeMarker: null,
        showInfoWindow: false,
        selectedRestaurant: ''
      })
    case LOAD_RESTAURANTS:
      return Object.assign({}, state, {
        restaurantsList: action.restaurantsList
      })
    case SELECT_RESTAURANT:
      return Object.assign({}, state, {
        activeMarker: action.activeMarker,
        showInfoWindow: action.showInfoWindow,
        selectedRestaurant: action.selectedRestaurant
      })
    default:
      return state
  }
}
