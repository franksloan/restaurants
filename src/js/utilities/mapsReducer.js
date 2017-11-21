import {
  ADD_MARKER, LOAD_RESTAURANTS, SELECT_RESTAURANT
} from '../maps/actions'

// The maps reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function maps(state = {
    restaurantMarkers: [],
    restaurantsList: []
  }, action) {
  switch (action.type) {
    case ADD_MARKER:
      let restaurantMarkers = state.restaurantMarkers
      restaurantMarkers.push(action.marker)
      return Object.assign({}, state, {
        restaurantMarkers: restaurantMarkers
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
