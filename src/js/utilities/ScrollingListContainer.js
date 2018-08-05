import React from 'react'

class Container extends React.Component {
	constructor(props){
		super()
	}

	render(){
		let mobile = window.innerWidth < 768 ? true : false
		let mapHeight = window.innerHeight * 0.75
		let paddingMobile = 40 + mapHeight + 'px'

		var styles = {
			float: mobile ? 'right' : 'left',
			paddingTop: mobile ? paddingMobile : '50px',
			paddingLeft: '1.5%',
			paddingRight: '1.5%',
			width: mobile ? '100%' : '50%',
			position: mobile ? 'relative' : undefined
		}
		return (
        <div style={styles}>
            {this.props.children}
        </div>
    )
	}
}

export default Container
