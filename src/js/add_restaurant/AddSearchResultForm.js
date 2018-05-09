import React from 'react'
import { Button, ListGroupItem, Panel, Form,
	FormGroup, FormControl, ControlLabel, Col,
	InputGroup, Alert } from 'react-bootstrap'

class AddSearchResultForm extends React.Component {
	constructor(){
		super()
    this.submitRestaurant = this.submitRestaurant.bind(this)
		this.isAddCategory = this.isAddCategory.bind(this)
		this.addCategory = this.addCategory.bind(this)
		this.alertUserAndClear = this.alertUserAndClear.bind(this);
		this.state = {
			addCategoryMode : false,
			new_category: '',
			isSaving: false,
			savedSuccessfully: false
		}
	}


	// If user has selected 'ADD' in the dropdown then change the mode
	// so that user can add new category
	isAddCategory(e){
		if(this.category.value == "add_new"){
			this.setState({addCategoryMode: true})
		}
  }

	// Is new category already in the list
	// if not then add it as a new one
	addCategory(e){

    console.log('New category: ' + this.new_category.value)

		this.setState({
			new_category: this.new_category.value,
			addCategoryMode: false
		})
  }


  submitRestaurant(e){
		e.preventDefault()
		this.setState({isSaving: true})

		const username = window.localStorage.getItem('username')
		const item = {
				id: this.props.infoFromGoogle.id,
				link: this.link.value.trim(),
				name: this.props.infoFromGoogle.name,
				address: this.props.infoFromGoogle.address,
				category: this.category ? this.category.value.trim() : undefined,
				position: this.props.infoFromGoogle.position,
				detail: this.review.value.trim(),
				googleRating: this.props.infoFromGoogle.googleRating,
				userRating: this.rating.value.trim(),
			  addedBy: username }
		this.props.saveRestaurant(item, this.alertUserAndClear)
		console.log('Added: ', item)
  }


	alertUserAndClear(){
		this.setState({
			isSaving: false,
			savedSuccessfully: true}
		)
		setTimeout(this.props.clearResults, 2000)
	}


	render(){
		let categoryOptions = this.props.categories.map(category => {
			return <option
							key={category.id}
							value={category.name}>
							{category.name}
						 </option>
		})
		return (
          <Panel bsStyle={this.state.added ? 'success' : 'info' }>
            <Panel.Heading>
              <Panel.Title componentClass="h3">
                 Your review
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
							<Form horizontal onSubmit={this.submitRestaurant} >
									<FormGroup controlId="category">
                    <Col componentClass={ControlLabel} sm={3}>
											Category
										</Col>
										<Col sm={9}>
											{!this.state.addCategoryMode &&
		                    <FormControl
													componentClass="select"
													placeholder="select"
													inputRef={ref => { this.category = ref } }
													onChange={this.isAddCategory}>
		                      {this.state.new_category.length <= 0 &&
														<option>select</option>
													}
													{this.state.new_category.length > 0 &&
														<option value={this.state.new_category}>{this.state.new_category}</option>
													}
													{categoryOptions}
		                      <option value="add_new">Add new category</option>
		                    </FormControl>
											}
											{this.state.addCategoryMode &&
												<InputGroup>
													<FormControl
			    									type="text"
			    									inputRef={ref => { this.new_category = ref } }
			    									placeholder="Add new category" />
													<InputGroup.Addon onClick={this.addCategory}>
														Add
													</InputGroup.Addon>
												</InputGroup>
											}
										</Col>
                  </FormGroup>

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
									<FormGroup controlId="link">
										<Col componentClass={ControlLabel} sm={3}>
											Link
										</Col>
										<Col sm={9}>
		                  <FormControl
		    									type="text"
		    									inputRef={ref => { this.link = ref } }
		    									placeholder="http://...." />
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
											 	type="submit"
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

export default AddSearchResultForm
