require('babel-register')();

var jsdom = require('jsdom');

var { JSDOM } = jsdom

var exposedProperties = ['window', 'navigator', 'document'];

const { window } = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>');

Object.keys(window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = window[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;