## React-liquidchart
A Nice looking liquid chart done with d3 and react, based off http://bl.ocks.org/brattonc/5e5ce9beee483220e2f6

I will put up an example page when I am finished with all the graph types that I want to do and use - about 4 -5 more.

### Install from NPM
```sh
npm install react-liquidchart
```

### Usage
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
          <Gradient />
        </Chart>
      </div>
    );
  }
}
render(<ChartLiquid />, document.getElementById('app'));
```

### Simpler version but with no gradient control

``` js
import React, { Component } from 'react';
import { render } from 'react-dom';
import LiquidChart from 'react-liquidchart';

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
        <LiquidChart
          responsive
          gradient="liquid"
          animate
          ease='easeBackIn'
          animateWaves
          onClick={this.onClick}
          amplitude={4}
          value={this.state.value}
        />
      </div>
    );
  }
}
render(<ChartLiquid />, document.getElementById('app'));
```

## Components
This chart is broken down into components.

### Chart
This is the container that renders the SVG element and the children.
It can keep the chart responsive so you dont have to worry about the width and heigth if you have a responsive layout.
### Chart PropTypes
Name|Type|Default|Description|
---|---|---|---
responsive|boolean|*true*| Rerenders the chart on screen resize
width|boolean|*true*| sets the width of the component, if responsive is true then it will take fill out into the parent container
height|boolean|*true*| sets the height of the component, the same applies here to the responsive prop.
gradient|string|*null*|If you want a more watery liquid you can add a lineargradient but you have to set this value to a string variable and also add the component
### Liquid
This is the main element that renders all the visable elements in the chart along with one defs for the clipPath.

### Liquid PropTypes
Name|Type|Default|Description|
---|---|---|---
Value|number|*65*|The value
animate|bool|*false*|If true then the chart is animated
animateWaves|bool|*false*|if true then the waves will loop between the liquid radius and 0 forever, still a minor bug in this.
outerRadius|number|*0.9*|This is the outerRadius of the chart where 1 would be 100% of the radius and 0 would be 0% of the radius..
innerRadius|number|*0.8*|The innerwidth of the outerpath surronding the liquid, again 0.8 would be 80% of the radius.
margin|number|*0.025*|The margin between the outer path and the liquid, here 0.025 would be 2.5%
ease|string|*'easeCubicInOut'*|The name of the d3 easing function, other values like, easeBack, easeBackInOut, easeSinInOut, easeExpInOut. See d3 easing page for more ideas.
animationTime|number|2000| milliseconds for animation length
amplitude|number|2|The Amplitude X * sine(frequency) part of the formula
frequency|number|4|Still have to fix this one, this is actually the inverse of frequency it's sine(x/freq) so the higher the number the smoother the wave.
waveScaleLimit|bool|true|This is in the original, this will create a scale that limits the wave height close to 0 or 100
outerArcStyle|shape|{ fill: 'rgb(23,139,202)'}| The style of the outerarc fill and stroke
liquid|shape|{ fill: 'rgb(23, 139, 202)'}| The style of the liquid, fill and stroke
liquidNumber|shape|{fill: 'rgb(164, 219, 248)'}| The style of the number that is in the liquid, fill and stroke
number|shape|{fill: 'rgb(4, 86, 129)'}| The style of the number that is not in the liquid, fill and stroke

### Gradient
This component is nothing more than an ultra thin wrapper around a linearGradient defs.

It takes in stop to create the gradient effect.

But by default it uses shades of the liquid.fill color to create a ultra simple gradient.
### Gradient PropTypes
Name|Type|Default|Description|
---|---|---|---
x1|number|*0*|The X start coordinate
x2|number|*0*|The X end coordinate
y1|number|*100*|The Y start coordinate, remember it starts on the bottom :)
y2|number|*0*|The Y end coordinate

### LiquidChart PropTypes
All of the above propTypes apply, except you cant insert the stop children into the gradient so it just uses
the liquid.fill color to create the gradient.


### TODO
1. Write some tests
2. Break up liquid component
3. Create a Text Component

This software was available initially under the BSD-2-Clause and it still is.
