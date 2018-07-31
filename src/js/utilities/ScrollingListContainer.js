import React from 'react'

class Container extends React.Component {
	constructor(props){
		super()
	}

	render(){
		let mobile = window.innerWidth < 768 ? true : false
		var styles = {
			float: mobile ? 'right' : 'left',
			paddingTop: '50px',
			paddingLeft: '1.5%',
			paddingRight: '1.5%',
			width: mobile ? '100%' : '50%',
			overflowY: 'scroll',
			position: mobile ? 'absolute' : undefined
		}
		return (
        <div style={styles}>
            {this.props.children}
        </div>
    )
	}
}

export default Container
