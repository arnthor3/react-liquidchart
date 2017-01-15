## React-liquidchart
[![Build Status](https://travis-ci.org/arnthor3/react-liquidchart.svg?branch=master)](https://travis-ci.org/arnthor3/react-liquidchart)
[![Coverage Status](https://coveralls.io/repos/github/arnthor3/react-liquidchart/badge.svg?branch=)](https://coveralls.io/github/arnthor3/react-liquidchart?branch=)

A Nice looking liquid chart done with d3 and react, based off http://bl.ocks.org/brattonc/5e5ce9beee483220e2f6

### Install from NPM
```sh
npm install react-liquidchart
```

### Usage
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
          animationWavesTime={4000}
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

### LiquidChart PropTypes
Name|Type|Default|Description|
---|---|---|---
Width|number|*null*| The width of the chart, used if responsive is false
height|number|*null*|The width of the chart, used if responsive is false
responsive|bool|*true*|If set to true then the element will fill out into parent container, and resize on window dimension change
Value|number|*65*|The value, tops at 100 and 0 is the minimum
animationWavesTime|number|*2000*|The speed of the wave animation, going back and forth
animationTime|number|2000| milliseconds for animation when updating value
animationEase|string|*'easeCubicInOut'*|The name of the d3 easing function, other values like, easeBack, easeBackInOut, easeSinInOut, easeExpInOut. See d3 easing page for more ideas.
outerBound|number|*0.9*|This is the outerRadius of the chart where 1 would be 100% of the radius and 0 would be 0% of the radius..
innerBound|number|*0.8*|The innerwidth of the outerpath surronding the liquid, again 0.8 would be 80% of the radius.
margin|number|*0.025*|The margin between the outer path and the liquid, here 0.025 would be 2.5%
amplitude|number|2|The Amplitude X * sine(frequency) part of the formula
frequency|number|4|The frequency, how many full circles are in the chart.
waveScaleLimit|bool|true|This is in the original, this will create a scale that limits the wave height close to 0 or 100
outerStyle|shape|{ fill: 'rgb(23,139,202)'}| The style of the outerarc fill and stroke
liquidStyle|shape|{ fill: 'rgb(23, 139, 202)'}| The style of the liquid, fill and stroke
dryStyle|shape|{fill: 'rgb(164, 219, 248)'}| The style of the number that is in the liquid, fill and stroke
wetStyle|shape|{fill: 'rgb(4, 86, 129)'}| The style of the number that is not in the liquid, fill and stroke

#### Licence

This software was available initially under the BSD-2-Clause and it still is.
Please see the original and put a github like on it at https://gist.github.com/brattonc/5e5ce9beee483220e2f6
