import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import UsMap from './us-maps/UsMap'
import Graph from './graph/Graph'

class Home extends React.Component {
	constructor(){
		super()
	}
	render(){
		return (
      <div>
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/map">Map</Link></li>
              <li><Link to="/graph">Graph</Link></li>
            </ul>
            <Route exact path='/' />
            <Route exact path='/map' component={UsMap} />
            <Route exact path='/graph' component={Graph} />
          </div>
        </Router>
      </div>
    )
	}
}

ReactDOM.render(
	<Home />,
	document.getElementById('app')
);
