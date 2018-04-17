export const SELECT_RESTAURANT = 'SELECT_RESTAURANT'
export const ADD_MARKER = 'ADD_MARKER'
export const LOAD_RESTAURANTS = 'LOAD_RESTAURANTS'
export const CLEAR_MARKERS = 'CLEAR_MARKERS'

export function onRestaurantClick(restaurantName, marker) {
  return {
    type: SELECT_RESTAURANT,
    showInfoWindow: true,
    activeMarker: marker,
    selectedRestaurant: restaurantName
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

function addRestaurants(restaurantsList){
  return {
    type: LOAD_RESTAURANTS,
    restaurantsList
  }
}

export function loadRestaurants() {

  let config = {
    method: 'GET',
    headers: { 'Content-Type':'application/json' }
  }

  return dispatch => {

    return fetch('http://localhost:5050/get_restaurants', config)
      .then(response =>
        response.json()
          .then(body => {
            console.log(body)
            return ({ body, response })
          }
        )
      )
      .then(({ body, response }) =>  {
        console.log(body, response)
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
