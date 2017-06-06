import React from 'react'
import {Chart, Mesh, Graticule, Polygon, projection, geoPath} from 'react-d3-map-core'
import * as topojson from 'topojson-client'
import UsState from './UsState'
import {tsv} from 'd3'


var width = 960,
    height = 600,
    margins = {top: 20, right: 50, bottom: 20, left: 50};

var title = "US Location"
var topodata = require("../../../us_states.json");
var stateNames = require("../../../states.json");

var usStateName = {};
for(var i = 0; i < stateNames.length; i++){
  usStateName[stateNames[i].id] = stateNames[i]
}

// data should be a MultiLineString
var dataCountries = topojson.mesh(topodata, topodata.objects.states, function(a, b) { return a !== b; });
var dataLand = topojson.feature(topodata, topodata.objects.states);

// var scale = 3*(width) / 2 / Math.PI;
// var translate = [width+300, height+100];
// var precision = 1;
// var projectionString = 'mercator';

// ALBERS USA
var scale = 6*(width) / 2 / Math.PI;
var translate = [width/2, height/2];
var precision = 0.1;
var projectionString = 'albersUsa';

var proj = projection({
	projection: projectionString,
	scale: scale,
	translate: translate,
	precision: precision
});
var geo = geoPath(proj);

var states = dataLand.features.map(function(d, i) {
  return (
    <UsState
          id={usStateName[d.id].name}
          key={i}
          data={d}
          geoPath={geo}
        />
  )
})

class UsMap extends React.Component {
	constructor(){
		super()
	}
	render(){
		return (
      <Chart
        title= {title}
        width= {width}
        height= {height}
        margins= {margins}
      >
      {states}
      <Mesh
        meshClass="state-borders"
        width= {width}
        height= {height}
        data= {dataCountries}
        projection = {projection}
        scale= {scale}
        translate= {translate}
        precision= {precision}
        geoPath= {geo}
      />
      </Chart>
    )
	}
}

export default UsMap
