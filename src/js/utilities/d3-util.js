import * as d3 from 'd3'
import ReactFauxDom from 'react-faux-dom'
import D3Selection from 'd3-selection'

export default {

	createD3Element(){
		return d3.select(this.createElement('div'))
	},

	createElement(element){
    	return ReactFauxDom.createElement(element);
  	},

  	createD3Path(){
  		return d3.select(this.createElement('path'))
  	},

  	createSvg(){
  		return d3.select(this.createElement('svg'))
  	},

  	select(node){
  		return d3.select(node)
  	},

  	geoAlbersUsa(){
  		return d3.geoAlbersUsa();
  	},

  	geoPath(proj){
  		return d3.geoPath(proj);
  	}

}