import {Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react'
import React from 'react'
import RestaurantMarker from './RestaurantMarker'

const style = {
  width: '100%',
  height: '100%'
}

export class GoogleMap extends React.Component {
  constructor(){
    super()
    this.state = {
      restaurantMarkers: []
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps){
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


  componentWillUnmount(){
    this.props.clearMarkers()
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
})(GoogleMap)
