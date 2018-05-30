import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import RestaurantMarker from './RestaurantMarker'

describe('RestaurantMarker component', () => {
  // Tests that when google is not loaded then a marker isn't added
  it('mounts and returns if google is not defined yet', () => {
  	const componentDidMountSpy = sinon.spy(RestaurantMarker.prototype, 'componentDidMount')
  	const addMarkerSpy = sinon.spy()

  	const wrapper = mount(<RestaurantMarker addMarker={addMarkerSpy}/>)
    expect(componentDidMountSpy.calledOnce).to.be.true
    expect(addMarkerSpy.callCount).to.equal(0)

    componentDidMountSpy.restore()
  })

  // Tests that when google has loaded a marker is added to the application state
  it('mounts and adds marker', () => {
  	const componentDidMountSpy = sinon.spy(RestaurantMarker.prototype, 'componentDidMount');
  	const addMarkerSpy = sinon.spy()
  	const googleStub = {
  		maps: {
  			LatLng: function LatLng(a,b){

  			},
  			Marker: function Marker(a){
  				return {
  					addListener: () => null
  				}
  			}
  		}
  	}
  	const position = {lat: 0, lng: 0}

  	const wrapper = mount(<RestaurantMarker 
  		addMarker={addMarkerSpy} 
  		google={googleStub} 
  		position={position} />)
    expect(componentDidMountSpy.calledOnce).to.be.true
    expect(addMarkerSpy.callCount).to.equal(1)

    componentDidMountSpy.restore()
  })
})