import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import quotesApp from './js/utilities/reducers'
import thunkMiddleware from 'redux-thunk'
import api from './js/middleware/api'
import Home from './js/Home'
import { browserHistory } from 'react-router'

let createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware, 
	api)(createStore)

let store = createStoreWithMiddleware(quotesApp)

ReactDOM.render(
	<Provider store={store} >
		<Home />
	</Provider>,
	document.getElementById('app')
)