import React from 'react'
import {Polygon} from 'react-d3-map-core'
import styles from './styles.css'

class UsState extends React.Component {
	constructor(props){
		super()
    this.state = {
      highlightClass: ""
    }
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
	}

  onMouseOver(a, feature, c){
    this.setState({
      highlightClass: styles.highlight
    })
  }

  onMouseOut(a, feature, c){
    this.setState({
      highlightClass: ""
    })
  }

	render(){
		return (
        <Polygon
          id={this.props.id}
          data={this.props.data}
          polygonClass={this.state.highlightClass}
          geoPath={this.props.geoPath}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        />
    )
	}
}

export default UsState
