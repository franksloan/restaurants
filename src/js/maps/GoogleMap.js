import {Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react'
import React from 'react'
import RestaurantMarker from './RestaurantMarker'

export class GoogleMap extends React.Component {
  constructor(){
    super()
    this.state = {
      restaurantMarkers: []
    }
  }


  componentDidMount(){
    console.log('MOUNT', this.props)
    let restaurantsList = this.props.restaurantsList
    let restaurantMarkers = restaurantsList.map( (restaurant) => {
        let marker = <RestaurantMarker
            key={restaurant.id}
            google={this.props.google}
            restaurant={restaurant}
            icon={{url: "/images/icons8-marker.png"}}
            onRestaurantClick={this.props.onRestaurantClick}
            addMarker={this.props.addMarker} />
        return marker
      })
    this.setState({
      restaurantMarkers: restaurantMarkers
    })
  }


  componentWillUnmount(){
    this.props.clearMarkers()
  }


  render() {
    let activeMarker = this.props.activeMarker
    let selectedRestaurant;
    if(this.props.selectedRestaurant){
      selectedRestaurant = this.props.selectedRestaurant
    }
    let height = window.innerHeight - 50
    height = height + 'px'
    console.log(height)
    return (
      <Map
        google={this.props.google}
        zoom={13}
        containerStyle={{position: 'fixed'}}
        style={{width: '50%', height: height}}
        initialCenter={{
            lat: 51.507781,
            lng: -0.109348
          }}
        center={{
            lat: selectedRestaurant ? selectedRestaurant.position.lat : 51.507781,
            lng: selectedRestaurant ? selectedRestaurant.position.lng : -0.109348
          }} >
        {this.state.restaurantMarkers}
        <InfoWindow
          visible={this.props.showInfoWindow}
          marker={activeMarker}>
          <div>
            <h4>{selectedRestaurant && selectedRestaurant.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA-vIs4_qlNrbXIzBYFJZKF9B8lkw0-S4I'
})(GoogleMap)
