import React from 'react'
import Container from '../utilities/Container'

// Static page to redirect to on user action
class Thanks extends React.Component {
	constructor(){
		super()
	}


	render(){
		return (
			<Container>
      	<h3>Thanks for signing up! Please login.</h3>
			</Container>
    )
	}
}

export default Thanks
