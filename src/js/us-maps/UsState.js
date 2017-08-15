import React from 'react'
import styles from './styles.css'
import d3Util from './../utilities/d3-util'

class UsState extends React.Component {
	constructor(props){
		super()
    this.state = {
      highlightClass: ""
    }
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
	}

  onMouseOver(){
    this.setState({
      highlightClass: styles.highlight
    })
  }

  onMouseOut(){
    this.setState({
      highlightClass: ""
    })
  }

	render(){
		return (
        d3Util.createD3Element()
          .append("path")
          .datum(this.props.data)
          .attr('id', this.props.id)
          .attr('class', this.state.highlightClass)
          .attr("d", this.props.geoPath)
          .on("mouseover", (d, i) => this.onMouseOver())
          .on("mouseout", (d, i) => this.onMouseOut())
          .node()
          .toReact()
    )
	}
}

export default UsState
