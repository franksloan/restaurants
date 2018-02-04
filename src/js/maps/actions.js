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

export function loadRestaurants(){
  return {
    type: LOAD_RESTAURANTS,
    restaurantsList
  }
}

const restaurantsList = [
  {
    id: 1,
    name: "Barrafina",
    link: "http://www.barrafina.co.uk/",
    address: "10 Adelaide St, London WC2N 4HZ",
    position: {lat: 51.5093954, lng: -0.1257111},
    averageRating: 8.6
  },
  {
    id: 2,
    name: "Hoppers Soho",
    link: "https://www.hopperslondon.com/",
    address: "49 Frith Street, London",
    position: {lat: 51.51360649999999, lng: -0.1316802},
    averageRating: 8.2
  }
]
