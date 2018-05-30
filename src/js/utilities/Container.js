import React from 'react'

class Container extends React.Component {
	constructor(props){
		super()
	}

	render(){
		console.log(this.props)
		var styles = {
			float: this.props.float || 'left',
			paddingTop: this.props.paddingTop || '50px',
			paddingLeft: this.props.paddingSide || '0px',
			paddingRight: this.props.paddingSide || '0px',
			width: this.props.width || '50%'
		}
		return (
        <div style={styles}>
            {this.props.children}
        </div>
    )
	}
}

export default Container
