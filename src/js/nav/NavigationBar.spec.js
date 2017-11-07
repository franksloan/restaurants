import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import NavigationBar from './NavigationBar'
import { Menu, Button } from 'semantic-ui-react'

describe('Navigation component', () => {

  it('should have 5 items when not authenticated', function () {
    const wrapper = shallow(<NavigationBar isAuthenitcated={false} dispatch={e => e}/>);
    
    expect(wrapper.find(Menu.Item)).to.have.length(5);
  });

  it('should have 4 items when authenticated', function () {
    const wrapper = shallow(<NavigationBar isAuthenticated={true} dispatch={e => e}/>);
    
    expect(wrapper.find(Menu.Item)).to.have.length(4);
  });

  it('changes active item when clicked', function () {
    const wrapper = shallow(<NavigationBar isAuthenticated={true} dispatch={e => e}/>);

    let mapMenuItem = wrapper.find(Menu.Item).filterWhere(n => n.childAt(0).text() == 'Map')
    mapMenuItem.simulate('click', {}, {name: 'map'})

    expect(wrapper.state().activeItem).to.equal('map')
  });

  it('logs out when clicked', function () {
  	let dispatchSpy = sinon.spy()
    const wrapper = shallow(<NavigationBar isAuthenticated={true} dispatch={dispatchSpy}/>);
    
    let logoutMenuItem = wrapper.find(Menu.Menu).find(Menu.Item);
    expect(logoutMenuItem).to.have.length(1)

    logoutMenuItem.simulate('click', {}, {name: 'logout'})

    expect(wrapper.state().activeItem).to.equal('home')
    expect(dispatchSpy.called).to.be.true;
  });
})