import React from 'react'
import { Button, ListGroupItem, Panel, Form,
	FormGroup, FormControl, ControlLabel, Col,
	InputGroup, Alert } from 'react-bootstrap'

class AddReviewForm extends React.Component {
	constructor(){
		super()
    this.submitReview = this.submitReview.bind(this)
		this.alertUserAndClear = this.alertUserAndClear.bind(this);
		this.state = {
			isSaving: false,
			savedSuccessfully: false
		}
	}

  submitReview(e){
		e.preventDefault()
		this.setState({isSaving: true})

		const username = window.localStorage.getItem('username')
		const item = {
				id: this.props.restaurantId,
				name: this.props.restaurantName,
				detail: this.review.value.trim(),
				userRating: this.rating.value.trim(),
			  addedBy: username }
		this.props.saveReview(item, this.alertUserAndClear)
		console.log('Added: ', item)
  }


	alertUserAndClear(){
		this.setState({
			isSaving: false,
			savedSuccessfully: true}
		)
	}


	render(){
		return (
          <Panel bsStyle={this.state.added ? 'success' : 'info' }>
            <Panel.Heading>
              <Panel.Title componentClass="h3">
                 Add review
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
							<Form horizontal  >

                  <FormGroup controlId="rating">
										<Col componentClass={ControlLabel} sm={3}>
											Rating
										</Col>
										<Col sm={9}>
	    						    <FormControl
	    									type="text"
	    									inputRef={ref => { this.rating = ref } }
	    									placeholder="7.5" />
										</Col>
                  </FormGroup>
                  <FormGroup controlId="review">
										<Col componentClass={ControlLabel} sm={3}>
											Details
										</Col>
										<Col sm={9}>
		                  <FormControl
		    									componentClass="textarea"
		    									inputRef={ref => { this.review = ref } }
		    									placeholder="....." />
										</Col>
  						    </FormGroup>
									{this.props.errorMessage &&
										<Col smOffset={3} sm={9}>
				            	<Alert bsStyle="danger">{this.props.errorMessage}</Alert>
										</Col>
				          }
									<FormGroup>
								    <Col smOffset={3} sm={9}>
									     <Button
											  onClick={this.submitReview}
												disabled={this.state.isSaving}
												bsStyle={this.state.savedSuccessfully ? 'success' : 'primary'}
												>
												{this.state.savedSuccessfully ? 'Success' :
													this.state.isSaving ? 'Saving' : 'Add'}
											 </Button>
								    </Col>
								  </FormGroup>
  						</Form>
						</Panel.Body>
          </Panel>
    )
	}
}

export default AddReviewForm
