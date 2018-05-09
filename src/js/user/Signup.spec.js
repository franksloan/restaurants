import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Signup from './Signup'
import * as Actions from './actions'
import { Button, Form, FormGroup, FormControl, ControlLabel, Col, Alert } from 'react-bootstrap'


describe('Signup Component', () => {
  it('has four fields and a button', () => {
  	const wrapper = shallow(<Signup />)

    expect(wrapper.find(FormControl)).to.have.length(4);
    expect(wrapper.find(Button)).to.have.length(1);
  })

  it('displays error message if populated', () => {
  	const wrapper = shallow(<Signup signupErrorMessage='No signup' />)

    expect(wrapper.find(Alert)).to.have.length(1);
    expect(wrapper.find(Alert).children().text()).to.equal('No signup');
  })

  it('submits new password when form is submitted', () => {
  	let dispatchSpy = sinon.spy()
    let signupUserStub = sinon.stub(Actions, 'signupUser')

  	const wrapper = mount(<Signup dispatch={dispatchSpy} />)

    wrapper.find(Button).simulate('click', { preventDefault: () => {} })

    expect(dispatchSpy.callCount).to.equal(1);
    expect(signupUserStub.callCount).to.equal(1);
  })
})
