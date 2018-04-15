import {
  SEARCH_RESULTS, ADD_SEARCH_MARKER, SELECT_RESULT, CLEAR_RESULTS
} from './actions'
import React from 'react'

// The maps reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function add_restaurant(state = {
    searchResults: [],
    googleSearchMarkers: []
  }, action) {
  switch (action.type) {
    case ADD_SEARCH_MARKER:
      let googleSearchMarkers = state.googleSearchMarkers
      googleSearchMarkers.push(action.marker)
      return Object.assign({}, state, {
        googleSearchMarkers: googleSearchMarkers
      })
    case SEARCH_RESULTS:
      return Object.assign({}, state, {
        searchResults: action.searchResults
      })
    case CLEAR_RESULTS:
      state.googleSearchMarkers.forEach(marker => marker.setMap(null))
      return Object.assign({}, state, {
        searchResults: [],
        googleSearchMarkers: [],
        activeSearchMarker: null,
        showSearchResultWindow: false,
        selectedSearchResult: ''
      })
    case SELECT_RESULT:
      console.log(action.selectedSearchResult)
      return Object.assign({}, state, {
        activeSearchMarker: action.activeSearchMarker,
        showSearchResultWindow: action.showSearchResultWindow,
        selectedSearchResult: action.selectedSearchResult
      })
    default:
      return state
  }
}
