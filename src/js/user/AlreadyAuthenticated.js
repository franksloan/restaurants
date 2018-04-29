import React from 'react'
import Container from '../utilities/Container'

// Static page to redirect to on user action
class AlreadyAuthenticated extends React.Component {
	constructor(){
		super()
	}


	render(){
		return (
			<Container>
      	<h3>This user is already authenticated!</h3>
			</Container>
    )
	}
}

export default AlreadyAuthenticated
