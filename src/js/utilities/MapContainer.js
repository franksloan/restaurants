import React from 'react'

class Container extends React.Component {
	constructor(props){
		super()
	}

	render(){
		let mobile = window.innerWidth < 768 ? true : false
		var styles = {
			float: mobile ? 'left' : 'right',
			paddingTop: mobile ? '50px' : '50px',
			paddingLeft: '0px',
			paddingRight: '0px',
			width: mobile ? '100%' : '50%',
			position: mobile ? 'absolute' : undefined,
			height: mobile ? '50%' : undefined
		}
		return (
        <div style={styles}>
            {this.props.children}
        </div>
    )
	}
}

export default Container
