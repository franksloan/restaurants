import { fetchFromEndpoint } from './../utilities/restService'

export const SEARCH_RESULTS = 'SEARCH_RESULTS'
export const ADD_SEARCH_MARKER = 'ADD_SEARCH_MARKER'
export const SELECT_RESULT = 'SELECT_RESULT'
export const CLEAR_RESULTS = 'CLEAR_RESULTS'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SAVE_RESTAURANT_ERROR = 'SAVE_RESTAURANT_ERROR'

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

function setCategories(categories){
  return {
    type: SET_CATEGORIES,
    categories
  }
}


export function getCategories() {
  let config = {
    method: 'GET',
    headers: { 'Content-Type':'application/json'}
  }

  return dispatch => {

    return fetch('http://localhost:5050/get_categories', config)
      .then(response => response.json()
          .then(body => ({ body, response }))
      )
      .then(({ body, response }) =>  {

        if(!response.ok){
          console.error('Could not retrieve categories');
        } else {
          dispatch(setCategories(body.categories))
        }
      }
    )
      .catch( err => console.log("Error: ", err.message))
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
          .then(body => ({ body, response })
        )
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

function saveRestaurantError(message){
  return {
    type: SAVE_RESTAURANT_ERROR,
    message
  }
}


export function saveNewRestaurant(item) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json'},
    body: JSON.stringify(item)
  }

  return dispatch => {

    return fetchFromEndpoint('http://localhost:5050/add_restaurant',
                  config, saveRestaurantError , getCategories, history, null, dispatch)
  }
}

function onSave(){

}
