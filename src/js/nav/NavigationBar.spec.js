import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import NavigationBar from './NavigationBar'
import { Navbar, Nav, NavItem } from 'react-bootstrap';

describe('Navigation component', () => {

  window.localStorage = storageMock()
  window.localStorage.setItem('username', 'frank')

  it('should have 5 items when not authenticated', function () {

    const wrapper = shallow(<NavigationBar isAuthenticated={false} dispatch={e => e}/>);

    expect(wrapper.find(Navbar.Header)).to.have.length(1)
    expect(wrapper.find(NavItem)).to.have.length(4);
  });

  it('should have 5 items when authenticated', function () {
    const wrapper = shallow(<NavigationBar isAuthenticated={true} dispatch={e => e}/>);

    expect(wrapper.find(Navbar.Header)).to.have.length(1)
    expect(wrapper.find(NavItem)).to.have.length(4);
  });

  it('expects username to be displayed', function () {
    const wrapper = shallow(<NavigationBar isAuthenticated={true} dispatch={e => e}/>);

    let usernameItem = wrapper.find(NavItem).filterWhere(n => n.childAt(0).text() == 'frank')
    expect(usernameItem).to.have.length(1)
  });

  it('logs out when clicked', function () {
  	let dispatchSpy = sinon.spy()
    const wrapper = shallow(<NavigationBar isAuthenticated={true} dispatch={dispatchSpy}/>);

    let logoutMenuItem = wrapper.find(NavItem).filterWhere(n => n.childAt(0).text() == 'Logout')
    expect(logoutMenuItem).to.have.length(1)

    logoutMenuItem.simulate('click', {}, {name: 'logout'})

    expect(dispatchSpy.called).to.be.true;
  });
})

function storageMock() {
  var storage = {};

  return {
    setItem: function(key, value) {
      storage[key] = value || '';
    },
    getItem: function(key) {
      return key in storage ? storage[key] : null;
    },
  };
}
