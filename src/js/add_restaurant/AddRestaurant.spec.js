import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import AddRestaurant from './AddRestaurant'
import { Button } from 'react-bootstrap'


describe('AddRestaurant component', () => {
  it('renders div', () => {
    let store = { getState :
      function(){
        return {add_restaurant: {} }
      }
    }
    const restaurantSearchSpy = sinon.spy()
  	const wrapper = shallow(<AddRestaurant
      store={store}
      searchForRestaurant={restaurantSearchSpy}
      />).dive()

  })
})
