import React, { Component } from 'react';
import { render } from 'react-dom';
import Liquid from './Chart/';

class Chart extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.state = {
      iter: Math.random() * 100,

    };
  }

  onClick() {
    const iter = this.state.iter + 1;
    this.setState({ iter: Math.random() * 100 });
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
          value={this.state.iter}
          animate
        />
      </div>
    );
  }
}

render(<Chart />, document.getElementById('app'));
