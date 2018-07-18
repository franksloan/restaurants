import React from 'react'

class Container extends React.Component {
	constructor(props){
		super()
	}

	render(){
		var styles = {
			float: this.props.float || undefined,
			paddingTop: this.props.paddingTop || '60px',
			paddingLeft: this.props.paddingSide || '0px',
			paddingRight: this.props.paddingSide || '0px',
			width: this.props.width || undefined,
			maxWidth: this.props.maxWidth || undefined,
			display: this.props.display || undefined,
    	margin:  this.props.margin || undefined,
		}
		return (
        <div style={styles}>
            {this.props.children}
        </div>
    )
	}
}

export default Container
