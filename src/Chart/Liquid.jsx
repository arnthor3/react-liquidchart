import React, { Component, PropTypes } from 'react';
import cloneChildren from 'react-offcharts-core/dist/Utils/cloneChildren';
import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { timer } from 'd3-timer';
import * as ease from 'd3-ease';
import 'd3-transition';
import { interpolate } from 'd3-interpolate';
import * as ch from '../Helpers/constants';

import * as ah from '../Helpers/animationHelpers';

import * as dh from '../Helpers/dimensions';

export default class Liquid extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    outerBoundaries: PropTypes.number,
    innerBoundaries: PropTypes.number,
    animationEase: PropTypes.string,
    animationTime: PropTypes.number,
    animationWavesTime: PropTypes.number,
    frequency: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  static defaultProps = {
    animationTime: 2000,
    animationEase: 'easeCubicInOut',
    amplitude: 1,
    liquidMargin: 0.005,
    waveScaleLimit: true,
    frequency: 4,
    deliminator: '.',
    postfix: '',
  }
  constructor(props) {
    super();
    if (props.innerBoundaries > props.outerBoundaries) {
      throw new Error(ch.INNER_BIGGER_THAN_OUTER);
    } else if (props.outerBoundaries > 1) {
      throw new Error(ch.OUTER_BIGGER_THAN_ONE);
    }
    this.iter = 0;
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate(prevProps, prevState) {
    this.renderChart();
  }

  getEasing() {
    const animationEase = ease[this.props.animationEase];

    if (animationEase === 'function') {
      return animationEase;
    }

    return ease.easeCubicInOut;
  }

  getAnimationTime() {
    const animationTime = this.props.animationTime;

    if (animationTime === undefined) {
      return 2000;
    }

    return animationTime;
  }

  animateWaves() {
    const arr = new Array(ch.SAMPLING);
    const container = select(this.container);
    const wave = container.select('clipPath').select('path');
    const waveScale = dh.getWaveScaleLimit(this.props);
    const { waveOne, waveTwo } = dh.getWaves(this.props);
    const anime = () => {
      wave
        .transition()
        .ease(ease.easeSin)
        .duration(this.props.animationWavesTime)
        .attr('d', waveOne(arr))
        .transition()
        .ease(ease.easeSinInOut)
        .duration(this.props.animationWavesTime)
        .attr('d', waveTwo(arr))
        .on('end', () => {
          anime();
        });
    };
    anime();
  }

  animate() {
    // Set the sampling array to a new array of X times undefines
    // does not matter because we only use zeros
    const arr = new Array(ch.SAMPLING);

    // Get the container element
    const container = select(this.container);

    // select the clippath that is going to be animated
    const wave = container.select('clipPath').select('path');

    // Get the easing type, if the user misspelled the easing or
    const animationEase = this.getEasing();

    const animationTime = this.getAnimationTime();

    const waveScale = dh.getWaveScaleLimit(this.props);

    const { waveArea, x, y, w, h } = dh.getWaveArea(this.props);

    const time = scaleLinear().range([0, 1]).domain([0, this.props.animationTime]);
    const sine = (a, i, f, s) => a * Math.sin(((Math.PI * 2) / s) * i * f);
    // waveArea.y0((d, i) => y(sine(waveScale(this.props.value), i, this.props.frequency) + this.props.value));
    const animation = (t, e) => {
      wave
        .transition()
        .duration(t || this.props.animationWavesTime)
        .ease(e || ease.easeSin)
        .attrTween('d', () => {
          wave.node().M = 1;
          const old = (wave.node().old) || 0;
          const forth = (
            scaleLinear()
              .range([wave.node().F || ch.SAMPLING, ch.SAMPLING * 0.8])
              .domain([0, 1])
          );
          const forthAmplitude = (
            scaleLinear()
              .range([wave.node().A || 1, -1])
              .domain([0, 1])
          );
          const interValue = interpolate(old, this.props.value);
          return (t1) => {
            const val = interValue(t1);
            const ampinter = forthAmplitude(t1);
            const bfSample = forth(t1);
            const ws = waveScale(val) * ampinter;
            waveArea
              .y0((d, i) => (
                y(sine(ws, i, this.props.frequency, bfSample) + val)
              ));
            wave.node().F = bfSample;
            wave.node().A = ampinter;
            return waveArea(arr);
          };
        })
        .transition()
        .duration(t || this.props.animationWavesTime)
        .ease(e || ease.easeSin)
        .attrTween('d', () => {
          wave.node().M = 0;
          wave.node().old = this.props.value;
          const back = (

            scaleLinear()
              .range([ch.SAMPLING * 0.8, ch.SAMPLING])
              .domain([0, 1])
          );
          const backAmplitude = (
            scaleLinear()
              .range([-1, 1])
              .domain([0, 1])
          );
          return (t2) => {
            const val = this.props.value;
            const ampinter = backAmplitude(t2);
            const bfSample = back(t2);
            const ws = waveScale(val) * ampinter;
            waveArea
              .y0((d, i) => (
                y(sine(ws, i, this.props.frequency, bfSample) + val)
              ));
            wave.node().F = bfSample;
            wave.node().A = ampinter;
            return waveArea(arr);
          };
        })
        .on('end', () => {
          wave.node().old = this.props.value;
          animation();
        });
    };
    const m = wave.node().M;

    if (m === 0 || m === 1) {

    }
    animation();
  }

  draw() {
    const arr = new Array(ch.SAMPLING);
    const container = select(this.container);
    const el = container.select('clipPath').select('path');
    const textValue = container.selectAll(`.${ch.TEXT_VALUE}`);
    const decimalValue = container.selectAll(`.${ch.TEXT_DECIMAL}`);
    decimalValue.text('.3');
    textValue.text(parseInt(this.props.value));
    el.attr('d', dh.getWave(this.props)(arr));
  }

  renderChart() {
    const shouldAnimate = (
      this.props.animationTime || this.props.animationEase
    );
    if (shouldAnimate) {
      this.animate();
      return;
    }
    this.draw();
  }

  render() {
    const d = dh.getDimensions(this.props);
    return (
      <g>

      <g
        ref={(c) => { this.container = c; }}
        transform={`translate(${d.cx},${d.cy})`}
      >
        {cloneChildren(this.props, d)}
      </g>
        <line
          x1={d.cx}
          x2={d.cx}
          y1={0}
          y2={this.props.height}
          stroke="red"
        />
        <line
          x1={0}
          x2={this.props.width}
          y1={d.cy}
          y2={d.cy}
          stroke="red"
        />
      </g>);
  }
}
