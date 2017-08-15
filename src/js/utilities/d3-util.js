import * as d3 from 'd3'
import ReactFauxDom from 'react-faux-dom'

export default {

	createD3Element(){
		return d3.select(this.createElement())
	},

	createElement(){
    	return ReactFauxDom.createElement('path');
  	}

}