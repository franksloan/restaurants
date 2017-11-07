import {Map, InfoWindow, GoogleApiWrapper, Marker } from 'google-maps-react'
import React from 'react'
import { Icon } from 'semantic-ui-react'
// import RestaurantMarker from './RestaurantMarker'

const style = {
  width: '100%',
  height: '100%'
}

export class MapContainer extends React.Component {
  constructor(){
    super()
    this.onMarkerClick = this.onMarkerClick.bind(this)
  }

  componentWillReceiveProps(newProps){
    if(newProps && newProps.restaurantsList.length !== this.props.restaurantsList.length){
      let restaurantsList = newProps.restaurantsList
      let restaurantMarkers = restaurantsList.map( (restaurant) => {
          let marker = <Marker 
              key={restaurant.id}
              position={restaurant.position}
              name={restaurant.name}
              icon={{url: "/images/icons8-marker.png"}}
              onClick={this.onMarkerClick} />
          this.props.addMarker(marker)
        })
    }
  }

  onMarkerClick(markerProps, marker){
    this.props.onRestaurantClick(markerProps.name, marker)
  }

  render() {
    return (
      <Map 
        google={this.props.google} 
        zoom={14}
        style={style}
        initialCenter={{
            lat: 51.507781, 
            lng: -0.109348
          }} >
        {this.props.restaurantMarkers}
        <InfoWindow
          marker={this.props.activeMarker}
          visible={this.props.showInfoWindow}>
          <div>
            <h4>{this.props.selectedRestaurant}</h4>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyA-vIs4_qlNrbXIzBYFJZKF9B8lkw0-S4I'
})(MapContainer)