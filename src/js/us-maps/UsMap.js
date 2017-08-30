import React from 'react'
import * as topojson from 'topojson-client'
import UsState from './UsState'
import UsBorder from './UsBorder'
import Container from './../utilities/Container'
import d3Util from './../utilities/d3-util'

var width = 960,
    height = 600,
    margins = {top: 0, right: 50, bottom: 20, left: 0};

var title = "US Location"
var topodata = require("../../../us_states.json");
var stateNames = require("../../../states.json");

var usStateName = {};
for(var i = 0; i < stateNames.length; i++){
  usStateName[stateNames[i].id] = stateNames[i]
}

var dataCountries = topojson.mesh(topodata, topodata.objects.states, function(a, b) { return a !== b; });
var dataLand = topojson.feature(topodata, topodata.objects.states);

// ALBERS USA
var scale = 6*(width) / 2 / Math.PI;
var translate = [width/2, height/2];
var precision = 0.1;
var projectionType = 'albersUsa';

var projection = d3Util.geoAlbersUsa()
      .scale(scale)
      .translate(translate)
      .precision(precision)

var geo = d3Util.geoPath(projection)

var states = dataLand.features.map(function(d, i) {
  return (
    <UsState
          id={usStateName[d.id].name}
          key={i}
          data={d}
          geoPath={geo} />
  )
})

class UsMap extends React.Component {
	constructor(){
		super()
	}
	render(){
		return (
      <Container
               width= {width}
               height= {height}
               title= {title}
             >
      {states}
      <UsBorder
        meshClass="state-borders"
        data= {dataCountries}
        geoPath= {geo} />
      </Container>
    )
	}
}

export default UsMap
