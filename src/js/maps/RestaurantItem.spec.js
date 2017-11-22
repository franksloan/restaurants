import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import RestaurantItem from './RestaurantItem'
import { Item } from 'semantic-ui-react'


describe('RestaurantItem component', () => {
  it('renders a header', () => {
    const restaurant = {
      link: "wwww.restaurant.com",
      name: "Barrafina",
      averageRating: 8,
      address: 'W'
    }

  	const wrapper = shallow(<RestaurantItem restaurant={restaurant} />)

    expect(wrapper.find(Item.Header).find('a').text()).to.equal('Barrafina');
  })

  it('sets a new active restaurant when clicked', () => {
    const marker1 = { title: 'Hoppers' }
    const marker2 = { title: 'Padella' }
    const marker3 = { title: 'Barrafina'}
    const restaurant = {
      link: "wwww.restaurant.com",
      name: "Barrafina",
      averageRating: 8,
      address: 'W'
    }
    const restaurantMarkers = [ marker1, marker2, marker3 ]

    const restaurantClickSpy = sinon.spy()

    const wrapper = shallow(<RestaurantItem 
      restaurant={restaurant} 
      restaurantMarkers={restaurantMarkers}
      onRestaurantClick={restaurantClickSpy} />)

    wrapper.find(Item).simulate('click')

    expect(restaurantClickSpy.callCount).to.equal(1)
    expect(restaurantClickSpy.calledWith(marker3.title, marker3)).to.be.true;
  })

  it("doesn't set a new active restaurant when the marker doesn't exist", () => {
    const marker1 = { title: 'Hoppers' }
    const marker2 = { title: 'Padella' }
    const restaurant = {
      link: "wwww.restaurant.com",
      name: "Barrafina",
      averageRating: 8,
      address: 'W'
    }
    const restaurantMarkers = [ marker1, marker2 ]

    const restaurantClickSpy = sinon.spy()

    const wrapper = shallow(<RestaurantItem 
      restaurant={restaurant} 
      restaurantMarkers={restaurantMarkers}
      onRestaurantClick={restaurantClickSpy} />)

    wrapper.find(Item).simulate('click')

    expect(restaurantClickSpy.callCount).to.equal(0)
  })
})