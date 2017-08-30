import React from 'react'
import Container from './../utilities/Container'
import d3Util from './../utilities/d3-util'

var width = 960,
    height = 600,
    title = 'Graph stuff'

var data = [4, 8, 15, 16, 23, 42]

var node = d3Util.createElement('svg')

var graph = d3Util.select(node)
				.selectAll("rect")
				.data(data)
				.enter()
				.append("rect")
				.style("height", d => { return d * 10 + "px"; })
				.style("width", width / (data.length + 5) )
				.attr("x", (d, i) => { return i * width/data.length } )
				.attr("y", d => { return height - (d * 10) })
				.text(d => { return d })

node = node.toReact()

class Graph extends React.Component {
	constructor(props){
		super()
	}

	render(){
		return (
      		<Container
      		  title= {title}
      		  width= {width}
      		  height= {height}
      		  >
      		  {node}
      		</Container>
    )
	}
}

export default Graph
