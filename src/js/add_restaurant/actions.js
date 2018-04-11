export const SEARCH_RESULTS = 'SEARCH_RESULTS'
export const ADD_SEARCH_MARKER = 'ADD_SEARCH_MARKER'
export const SELECT_RESULT = 'SELECT_RESULT'
export const CLEAR_RESULTS = 'CLEAR_RESULTS'

export function onSearchResultClick(resultName, marker) {
  return {
    type: SELECT_RESULT,
    showSearchResultWindow: true,
    activeSearchMarker: marker,
    selectedSearchResult: resultName
  }
}

export function addSearchMarker(marker){
  return {
    type: ADD_SEARCH_MARKER,
    marker
  }
}

export function clearResults(){
  return {
    type: CLEAR_RESULTS
  }
}

function addRestaurants(searchResults){
  return {
    type: SEARCH_RESULTS,
    searchResults
  }
}

export function searchForRestaurant(searchTerm) {

  let config = {
    method: 'GET',
    headers: { 'Content-Type':'application/x-www-form-urlencoded'}
  }

  return dispatch => {

    return fetch('http://localhost:5050/find_restaurant?searchTerm='+searchTerm, config)
      .then(response =>
        response.json()
          .then(body => ({ body, response }))
      )
      .then(({ body, response }) =>  {

        if(!response.ok){
          console.error('Could not retrieve restaurants');
        } else {
          dispatch(addRestaurants(body.restaurants))
        }
      }
    )
      .catch( err => console.log("Error: ", err.message))
  }
}
