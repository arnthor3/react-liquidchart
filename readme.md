# React-Liquidchart
A Nice looking liquid chart done with d3 and react

## Usage
Download the package from npm
``` sh
npm i -S react-liquidchart
```
``` js
import React, { Component } from 'react';
import { render } from 'react-dom';
import Liquid from 'react-liquidchartr';

class Chart extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.state = {
      value: Math.random() * 100,
    };
  }
  onClick() {
    this.setState({ value: Math.random() * 100 });
  }

  render() {
    return (
      <div
        style={{
          width: '800px',
          height: '350px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Liquid
          onClick={this.onClick}
          value={this.state.value}
          animate
        />
      </div>
    );
  }
}
render(<Chart />, document.getElementById('app'));
render(app, document.getElementById('app');
```

## PropTypes
### value : number
a percentage from 0 to 100
### animate : boolean
if true then animate
### onEnd : function
A function that is called when animation is done
### outerArcStyle : Object { fill: string, stroke: string }
A fill and stroke for the outer arc, defaults to fill: 'rgb(23, 139, 202)'
### liquid : Object { fill: string, stroke: string }
A fill and stroke for the liquid, defaults to fill: 'rgb(23, 139, 202)'
### liquidNumber : Object { fill: string, stroke: string }
A fill and stroke for the part of the number that is in liquid
defaults to fill: 'rgb(164, 219, 248)',
### number : Object { fill: string, stroke: string }
A fill and stroke for the 'dry' part of the number default to fill: 'rgb(4, 86, 129)'
### amplitude : number
the wave height
### frequency : number
The inverse of frequency actually, the higher the number the smother the wave
### responsive : boolean
Makes the chart listen to changes in screen size and resize the chart on screen resize

## Development
Testing done with Jest
``` sh
npm run test
```
#Credits
This is a react remake and slightly altered version of http://bl.ocks.org/brattonc/5e5ce9beee483220e2f6
So a big thanks to Chris Bratton for making the original