import React from 'react'
import { Jumbotron } from 'react-bootstrap'

var styles = {
	paddingTop: '60px', paddingLeft:'1.5%', paddingRight:'1.5%'
}

class Container extends React.Component {
	constructor(props){
		super()
	}

	render(){

		return (
        <div style={styles}>
            {this.props.children}
        </div>
    )
	}
}

export default Container
