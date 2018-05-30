import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import ScrollingList from './ScrollingList'
import { ListGroup } from 'react-bootstrap'


describe('ScrollingList component', () => {
  it('renders 2 restaurants', () => {
  	const restaurants = [
  		{
  			id: 1,
  			name: 'Hoppers'
  		},
  		{	id: 2,
  			name: 'Barrafina'
  		}]
    let TestRestaurantScroll = ScrollingList.create(DummyComponent)
  	const wrapper = shallow(<TestRestaurantScroll restaurantsList={restaurants}/>)
    expect(wrapper.find(ListGroup).children()).to.have.length(restaurants.length)
  })
})

class DummyComponent extends React.Component {
}
