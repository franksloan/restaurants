import React from 'react'
import { PageHeader } from 'react-bootstrap'

class AlreadyAuthenticated extends React.Component {
	constructor(){
		super()
	}


	render(){
		return (
      <h3>This user is already authenticated!</h3>
    )
	}
}

export default AlreadyAuthenticated
