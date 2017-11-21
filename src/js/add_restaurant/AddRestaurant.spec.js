import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import AddRestaurant from './AddRestaurant'


describe('AddRestaurant component', () => {
  it('renders div', () => {
  	const wrapper = shallow(<AddRestaurant />)
    expect(wrapper.find('div').text()).equal('Add')
  })
})