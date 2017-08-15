import React from 'react'
import d3Util from './d3-util'

class Container extends React.Component {
	constructor(props){
		super()
	}

	render(){
    const divStyles = {
        width: this.props.width,
        height: this.props.height,
        position: 'relative'
      }

    const svgStyles = {
      width: this.props.width,
      height: this.props.height
    }

		return (
        <div style={divStyles}> 
          <svg style={svgStyles}>
            {this.props.children}
          </svg>
        </div>
    )
	}
}

export default Container
