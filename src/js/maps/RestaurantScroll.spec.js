import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import RestaurantScroll from './RestaurantScroll'
import { Item } from 'semantic-ui-react'


describe('RestaurantScroll component', () => {
  it('renders 2 restaurants', () => {
  	const restaurants = [
  		{
  			id: 1,
  			name: 'Hoppers'
  		},
  		{	id: 2,
  			name: 'Barrafina'
  		}]
  	const wrapper = shallow(<RestaurantScroll restaurantsList={restaurants}/>)
    expect(wrapper.find(Item.Group).children()).to.have.length(restaurants.length)
  })
})