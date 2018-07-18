import React from 'react'
import Container from '../utilities/Container'

// Static page to redirect to on user action
class AlreadyAuthenticated extends React.Component {
	constructor(){
		super()
	}


	render(){
		return (
			<Container maxWidth='600px' width='95%' display='block' margin='auto'>
      	<h3>This user is already authenticated!</h3>
			</Container>
    )
	}
}

export default AlreadyAuthenticated
