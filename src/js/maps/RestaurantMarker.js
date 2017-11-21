import React from 'react'

var wrappedPromise = function wrappedPromise() {
  var wrappedPromise = {},
      promise = new Promise(function (resolve, reject) {
    wrappedPromise.resolve = resolve;
    wrappedPromise.reject = reject;
  });
  wrappedPromise.then = promise.then.bind(promise);
  wrappedPromise.catch = promise.catch.bind(promise);
  wrappedPromise.promise = promise;

  return wrappedPromise;
};

class RestaurantMarker extends React.Component {
	constructor(props){
		super()
		this.onMarkerClick = this.onMarkerClick.bind(this)
	}

	componentDidMount(){
		this.markerPromise = wrappedPromise()
		this.renderMarker()
	}


	componentDidUpdate(){
	      if (this.marker || !this.props.map) {
	        return;
	      }
	      this.renderMarker();
	}


	renderMarker(){
		let google = this.props.google

		if(!google){
			return
		}
		let pos = this.props.position
		let position = new google.maps.LatLng(pos.lat, pos.lng)

		var pref = {
			position: position,
			map: this.props.map,
			icon: this.props.icon,
			title: this.props.name
		}

		this.marker = new google.maps.Marker(pref)

		this.marker.addListener('click', this.handleEvent())
	
		this.markerPromise.resolve(this.marker)

		this.props.addMarker(this.marker)
	}

	handleEvent(){
		let _this = this
		return function(e){
			_this.onMarkerClick(_this.props, _this.marker)
		}

	}


	onMarkerClick(markerProps, marker){
	  this.props.onRestaurantClick(markerProps.name, marker)
	}


	render(){
		return (
			null
    	)
	}
}

export default RestaurantMarker
