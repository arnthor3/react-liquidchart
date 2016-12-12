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
import { Chart, Liquid, Gradient } from 'react-liquidchart';

class ChartLiquid extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.state = ({
      value: (Math.random() * 100),
    });
  }

  onClick() {
    this.setState({
      value: (Math.random() * 100),
    });
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '500px',
        }}
      >
        <Chart
          responsive
          gradient="liquid"
        >
          <Liquid
            animate
            animateWaves
            onClick={this.onClick}
            amplitude={4}
            value={this.state.value}

          />
          <Gradient>
            <stop stopColor="someColor" offset="somepercentage%"/>
            <stop stopColor="someColor" offset="somepercentage%"/>
            <stop stopColor="someColor" offset="somepercentage%"/>
            <stop stopColor="someColor" offset="somepercentage%"/>
          </Gradient>
        </Chart>
      </div>
    );
  }
}

render(<ChartLiquid />, document.getElementById('app'));
```

## Components
### Chart
The Chart container component, calculates width and height and renders the svg and charts
#### Chart PropTypes
##### responsive : boolean
Makes the chart listen to changes in screen size and resize the chart on screen resize
##### gradient : string
If liquid is gradient then set the string to something, it's used to set the fill
### Liqiud
The Liquid Component has all the visable Components
#### Liquid PropTypes
##### value : number
a percentage from 0 to 100
##### animate : boolean
if true then animate
##### animateWaves : boolean
if true then animate waves
##### gradient : boolean
If true then add gradient effect on liquid based on liquid.fill color
##### onEnd : function
A function that is called when animation is done
##### outerArcStyle : Object { fill: string, stroke: string }
A fill and stroke for the outer arc, defaults to fill: 'rgb(23, 139, 202)'
##### liquid : Object { fill: string, stroke: string }
A fill and stroke for the liquid, defaults to fill: 'rgb(23, 139, 202)'
##### liquidNumber : Object { fill: string, stroke: string }
A fill and stroke for the part of the number that is in liquid
defaults to fill: 'rgb(164, 219, 248)',
##### number : Object { fill: string, stroke: string }
A fill and stroke for the 'dry' part of the number default to fill: 'rgb(4, 86, 129)'
##### amplitude : number
the wave height
##### frequency : number
The inverse of frequency actually, the higher the number the smother the wave
##### waveScaleLimit : bool
scaling the wave when it´s close to 0 or 100 so the area does not appear empty at those values
##### fontSize : string
The font size attribute for the number
##### smallFontSize : string
font size for the percentage sign
### Gradient
The Gradient is just a thin wrapper for linearGradient it takes in stop children,
if none are set it makes a gradient out of the shades of the liquid.fill proptype

## Development
Testing done with Jest
``` sh
npm run test
```

Run the webpack dev server
``` sh
npm run start
```

#Credits
This is a react remake and slightly altered version of http://bl.ocks.org/brattonc/5e5ce9beee483220e2f6
So a big thanks to Chris Bratton for making the original!
