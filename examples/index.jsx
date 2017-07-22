import React, { Component } from 'react';
import { render } from 'react-dom';
import LiquidChart from '../src/index';

const style = {
  width: '50%',
  height: '500px',
};
const stops = [
  <stop key={4} offset="0" stopColor="blue" />,
  <stop key={5} offset="1" stopColor="red" />,
];

class TestLiquid extends Component {
  constructor() {
    super();
    this.onClickOne = this.onClickOne.bind(this);
    this.onClickTwo = this.onClickTwo.bind(this);
    this.state = {
      valueOne: 100,
      valueTwo: Math.random() * 100,
    };
  }

  onClickOne() {
    this.setState({ valueOne: Math.random() * 100 });
  }

  onClickTwo() {
    this.setState({ valueTwo: Math.random() * 100 });
  }

  render() {
    return (
      <span>
        <div style={style}>
          <LiquidChart
            responsive
            legend="Percentage of Completed Tasks"
            value={this.state.valueOne}
            amplitude={4}
            frequency={2}
            animationTime={2000}
            animationWavesTime={2250}
            deliminator="~"
            showDecimal
            gradient={{
              type: 1,
              x1: '0%',
              y1: '0%',
              x2: '20%',
              y2: '100%',
              gradientUnits: 'userSpaceOnUse',
              stops,
            }}
            postfix="%"
            fontSizes={{
              legend: 0.12,
              value: 0.6,
              decimal: 0.2,
              percentage: 0.15,
            }}
          />
        </div>
        <button onClick={() => { this.onClickOne(); }}>RANDOM</button>
        <div style={style}>
          <LiquidChart
            responsive
            legend="Percentage of Completed Tasks"
            value={this.state.valueTwo}
            waveScaleLimit
            amplitude={2}
            frequency={4}
          />
        </div>
      </span>
    );
  }

}

render(<TestLiquid />, document.getElementById('app'));

