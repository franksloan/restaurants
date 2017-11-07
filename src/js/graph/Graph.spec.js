import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Graph from './Graph'
const wrapper = shallow(<Graph />)

describe('Graph component', () => {
  it('renders div', () => {
    expect(wrapper.find('div').text()).equal('Yeah')
  })
  it('renders p', () => {
    expect(wrapper.find('p').text()).toEqual('Welcome to my world')
  })
})