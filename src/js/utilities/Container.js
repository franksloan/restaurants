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

    const titleStyle = {
      width: this.props.width,
      textAlign: 'center',
      fontSize: '2em'
    }

		return (
        <div style={divStyles}>
          <div style={titleStyle}>{this.props.title}</div>
          <svg className='chart' style={svgStyles}>
            {this.props.children}
          </svg>
        </div>
    )
	}
}

export default Container
