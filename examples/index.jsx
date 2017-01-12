import React, { Component } from 'react';
import { render } from 'react-dom';
import LiquidChart from '../src/index';

const style = {
  width: '600px',
  height: '500px',
};

class TestLiquid extends Component {
  constructor() {
    super();
    this.onClickOne = this.onClickOne.bind(this);
    this.onClickTwo = this.onClickTwo.bind(this);
    this.state = {
      valueOne: Math.random() * 100,
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
    return(
      <span>
        <div style={style}>
          <LiquidChart
            responsive
            dryStyle={{
              fill: 'red',
            }}
            wetStyle={{
              fill: 'white',
            }}
            legend="Percentage of Completed Tasks"
            value={this.state.valueOne}
            amplitude={8}
            frequency={2}
            animationWavesTime={2500}
          />
        </div>
        <button onClick={() => { this.onClickOne(); }}>RANDOM</button>
        <div style={style}>
          <LiquidChart
            responsive
            dryStyle={{
              fill: 'red',
            }}
            wetStyle={{
              fill: 'white',
            }}
            legend="Percentage of Completed Tasks"
            value={this.state.valueTwo}
            waveScaleLimit
            amplitude={0}
          />
        </div>
      </span>
    );
  }

}

render(<TestLiquid />, document.getElementById('app'));

