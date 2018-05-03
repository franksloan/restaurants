import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import ResetPassword from './ResetPassword'
import * as Actions from './actions'
import { Button, Form, FormGroup, FormControl, ControlLabel, Col, Alert } from 'react-bootstrap'


describe('ResetPassword Component', () => {
  it('has two fields and a button', () => {
  	const wrapper = shallow(<ResetPassword />)

    expect(wrapper.find(FormControl)).to.have.length(3);
    expect(wrapper.find(Button)).to.have.length(1);
  })

  it('displays error message if populated', () => {
  	const wrapper = shallow(<ResetPassword submitNewPasswordErrorMessage='No reset' />)

    expect(wrapper.find(Alert)).to.have.length(1);
    expect(wrapper.find(Alert).children().text()).to.equal('No reset');
  })

  it('submits new password when form is submitted', () => {
  	let dispatchSpy = sinon.spy()
    let submitNewPasswordStub = sinon.stub(Actions, 'submitNewPassword')

  	const wrapper = mount(<ResetPassword dispatch={dispatchSpy} />)

    wrapper.find(Button).simulate('click', { preventDefault: () => {} })

    expect(dispatchSpy.callCount).to.equal(1);
    expect(submitNewPasswordStub.callCount).to.equal(1);
  })
})
