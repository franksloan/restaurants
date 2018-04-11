import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Login from './Login'
import { Button, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap'


describe('Login Component', () => {
  it('has two fields and a button', () => {
  	const wrapper = shallow(<Login />)

    expect(wrapper.find(FormControl)).to.have.length(2);
    expect(wrapper.find(Button)).to.have.length(1);
  })

  it('displays error message if populated', () => {
  	const wrapper = shallow(<Login errorMessage='No login' />)

    expect(wrapper.find('p')).to.have.length(1);
    expect(wrapper.find('p').text()).to.equal('No login');
  })

  it('logs in when form is submitted', () => {
  	let dispatchSpy = sinon.spy()
  	const wrapper = mount(<Login dispatch={dispatchSpy} />)

  	let usernameChange = {target: { value: 'Johnny'} }
    let usernameInput = wrapper.find(FormControl).first()
    usernameInput.find('input').simulate('change', usernameChange)

    let passwordChange = {target: { value: 'Bravo'} }
    let passwordInput = wrapper.find(FormControl).last()
    passwordInput.find('input').simulate('change', passwordChange)

    wrapper.find(Button).simulate('click')
    expect(dispatchSpy.callCount).to.equal(1);
  })
})
