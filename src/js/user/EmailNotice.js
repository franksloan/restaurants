import React from 'react'
import Container from '../utilities/Container'

// Static page to redirect to on user action
class EmailNotice extends React.Component {
	constructor(){
		super()
	}


	render(){
		return (
			<Container>
      	<h3>Email sent.</h3>
			</Container>
    )
	}
}

export default EmailNotice
