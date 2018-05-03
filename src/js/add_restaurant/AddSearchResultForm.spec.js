import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import AddSearchResultForm from './AddSearchResultForm'
import { Button, ListGroupItem, Panel, Form, FormGroup, FormControl, ControlLabel, Col, InputGroup } from 'react-bootstrap'


describe('AddSearchResultForm component', () => {
  it('renders title', () => {
  	const wrapper = shallow(<AddSearchResultForm categories={[]}/>)

    expect(wrapper.find(Panel.Title)).to.have.length(1)
  })

  it('renders button, rating, review, link and category sections', () => {
  	const wrapper = shallow(<AddSearchResultForm categories={[]}/>)

    expect(wrapper.find(FormGroup)).to.have.length(5)
  })

  it('allows typing in a new category', () => {
  	const wrapper = mount(<AddSearchResultForm categories={[]}/>)

    // Can't add category to begin with
    expect(wrapper.find(InputGroup.Addon)).to.have.length(0)

    // Select the dropdown 'add_new'
    wrapper.find('select').node.selectedIndex = 1;
    wrapper.find(FormControl).first().simulate('change')

    // Can add category
    expect(wrapper.state().addCategoryMode).to.be.true
    expect(wrapper.find(InputGroup.Addon)).to.have.length(1)

    // Add
    wrapper.find(InputGroup.Addon).simulate('click')

    expect(wrapper.state().addCategoryMode).to.be.false
    expect(wrapper.find(InputGroup.Addon)).to.have.length(0)
  })
})
