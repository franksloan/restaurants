import {Map, InfoWindow, GoogleApiWrapper, Marker } from 'google-maps-react'
import React from 'react'
import { Icon } from 'semantic-ui-react'
import RestaurantMarker from './RestaurantMarker'

const style = {
  width: '100%',
  height: '100%'
}

export class MapContainer extends React.Component {
  constructor(){
    super()
    this.state = {
      restaurantMarkers: []
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps && this.state.restaurantMarkers.length ==0 && newProps.restaurantsList.length !== this.props.restaurantsList.length){
      let restaurantsList = newProps.restaurantsList
      let restaurantMarkers = restaurantsList.map( (restaurant) => {
          let marker = <RestaurantMarker 
              key={restaurant.id}
              position={restaurant.position}
              google={newProps.google}
              name={restaurant.name}
              icon={{url: "/images/icons8-marker.png"}}
              onRestaurantClick={this.props.onRestaurantClick}
              addMarker={this.props.addMarker} />
              return marker
        })
      this.setState({
        restaurantMarkers: restaurantMarkers
      })
    }
  }


  render() {
    let activeMarker = this.props.activeMarker
    return (
      <Map 
        google={this.props.google} 
        zoom={13}
        style={style}
        initialCenter={{
            lat: 51.507781, 
            lng: -0.109348
          }} >
        {this.state.restaurantMarkers}
        <InfoWindow
          visible={this.props.showInfoWindow}
          marker={activeMarker}>
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