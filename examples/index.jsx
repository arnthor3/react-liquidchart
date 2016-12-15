import React, { Component } from 'react';
import { render } from 'react-dom';
import LiquidChart, { Chart, Liquid, Gradient } from '../src/index';

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
    const Comp = (
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
            animationWavesTime={4000}
            onClick={this.onClick}
            amplitude={4}
            value={this.state.value}
          />
          <Gradient />
        </Chart>
      </div>
    );

    const Easy = (
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
          animationWavesTime={150}
          onClick={this.onClick}
          amplitude={4}
          value={this.state.value}
        />
      </div>
    );
    return (
      Comp
    );
  }
}


render(<ChartLiquid />, document.getElementById('app'));

