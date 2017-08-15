import React from 'react'
import styles from './styles.css'
import d3Util from './../utilities/d3-util'

class UsBorder extends React.Component {
	constructor(props){
		super()
	}

	render(){
		return (
        d3Util.createD3Element()
          .datum(this.props.data )
          .attr("class", "state-borders")
          .attr("d", this.props.geoPath )
          .style('fill', 'none')
          .style('stroke', '#CCC')
          .style('stroke-width', '.5px')
          .node()
          .toReact()
    )
	}
}

export default UsBorder
