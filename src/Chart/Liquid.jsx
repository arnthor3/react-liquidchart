import React, { Component, PropTypes } from 'react';
import cloneChildren from 'react-offcharts-core/Utils/cloneChildren';
import arcDim from 'react-offcharts-core/Helpers/arcDimension';
import { round, splitNumber } from 'react-offcharts-core/Utils/numbers';
import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import * as ease from 'd3-ease';
import 'd3-transition';
import { interpolate } from 'd3-interpolate';
import * as ch from '../Helpers/constants';
import * as dh from '../Helpers/dimensions';

export default class Liquid extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    outerBound: PropTypes.number,
    innerBound: PropTypes.number,
    animationEase: PropTypes.string,
    animationTime: PropTypes.number,
    animationWavesTime: PropTypes.number,
    frequency: PropTypes.number,
  }

  static defaultProps = {
    amplitude: 1,
    liquidMargin: 0.005,
    waveScaleLimit: true,
    frequency: 4,
    deliminator: '.',
    postfix: '',
  }
  constructor(props) {
    super();
    if (props.innerBound > props.outerBound) {
      console.warn(ch.INNER_BIGGER_THAN_OUTER);
    } else if (props.outerBound > 1) {
      console.warn(ch.OUTER_BIGGER_THAN_ONE);
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

    if (typeof animationEase === 'function') {
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

  animateBackAndForth() {
    // Set the sampling array to a new array of X times undefines
    // does not matter because we only use zeros
    const arr = new Array(ch.SAMPLING);

    // Get the container element
    const container = select(this.container);

    // select the clippath that is going to be animated
    const wave = container.select('clipPath').select('path');

    // Get the easing type, if the user misspelled the easing or
    const animationEase = this.getEasing();

    // Get the animationtime
    const animationTime = this.getAnimationTime();

    // get the wavescale
    const waveScale = dh.getWaveScaleLimit(this.props);

    // get the scales and the area function
    const { waveArea, x, y } = dh.getWaveArea(this.props); // { waveArea, x, y, w, h }

    const { forthAmplitude, backAmplitude, forthFrequency, backFrequency } = dh.getBackAndForth();

    const textValue = container.selectAll(`.${ch.TEXT_VALUE}`);
    const textDecimal = container.selectAll(`.${ch.TEXT_DECIMAL}`);

    const animation = () => {
      wave
        .transition()
        .duration(this.props.animationWavesTime)
        .ease(ease.easeSinInOut)
        .attrTween('d', () => {
          wave.node().M = 1;
          return (t1) => {
            const amp = forthAmplitude(t1);
            const freq = forthFrequency(t1);
            const ws = amp * waveScale(this.props.value);
            waveArea
              .y0((d, i) => (
                y(dh.sine(ws, i, this.props.frequency, freq) + this.props.value)
              ));
            wave.node().A = amp;
            wave.node().F = freq;
            return waveArea(arr);
          };
        })
        .transition()
        .duration(this.props.animationWavesTime)
        .ease(ease.easeSinInOut)
        .attrTween('d', () => {
          wave.node().M = 0;
          return (t1) => {
            const amp = backAmplitude(t1);
            const freq = backFrequency(t1);
            const ws = amp * waveScale(this.props.value);
            waveArea
              .y0((d, i) => (
                y(dh.sine(ws, i, this.props.frequency, freq) + this.props.value)
              ));
            wave.node().A = amp;
            wave.node().F = freq;
            return waveArea(arr);
          };
        })
        .on('end', () => {
          animation();
        });
    };

    wave
      .transition()
      .duration(animationTime)
      .ease(animationEase)
      .attrTween('d', () => {
        const interVal = interpolate(wave.node().old || 0, this.props.value);
        const {
          amplitudeScale,
          frequencyScale,
        } = dh.getWaveValueMovement(wave.node());

        const updateNum = (val) => {
          const value = round(val);
          const sp = splitNumber(value, this.props.deliminator);
          textValue.text(sp.number);
          textDecimal.text(`.${sp.fraction}`);
        };

        return (t) => {
          const val = interVal(t);
          const amp = amplitudeScale(t);
          const freq = frequencyScale(t);
          const ws = amp * waveScale(val);
          waveArea
            .y0((d, i) => (
              y(dh.sine(ws, i, this.props.frequency, freq) + val)
            ));
          wave.node().old = val;
          wave.node().A = amp;
          wave.node().F = freq;
          updateNum(val);
          return waveArea(arr);
        };
      })
      .on('end', () => {
        animation();
      });
  }

  animateValue() {
    // Set the sampling array to a new array of X times undefines
    // does not matter because we only use zeros
    const arr = new Array(ch.SAMPLING);

    // Get the container element
    const container = select(this.container);

    // select the clippath that is going to be animated
    const wave = container.select('clipPath').select('path');

    // Get the easing type, if the user misspelled the easing or
    const animationEase = this.getEasing();

    // Get the animationtime
    const animationTime = this.getAnimationTime();
    // get the wavescale
    const waveScale = dh.getWaveScaleLimit(this.props);
    // get the areafunction and dimensions
    const { waveArea, x, y } = dh.getWaveArea(this.props); // { waveArea, x, y, w, h }
    // get the text variables
    const textValue = container.selectAll(`.${ch.TEXT_VALUE}`);
    const textDecimal = container.selectAll(`.${ch.TEXT_DECIMAL}`);

    wave
      .transition()
      .duration(animationTime)
      .ease(animationEase)
      .attrTween('d', () => {
        const interVal = interpolate(wave.node().old || 0, this.props.value);
        const updateNum = (val) => {
          const value = round(val);
          const sp = splitNumber(value, '.');
          textValue.text(sp.number);
          textDecimal.text(`.${sp.fraction}`);
        };
        return (t) => {
          const val = interVal(t);
          const ws = waveScale(val);
          waveArea
            .y0((d, i) => (
              y(dh.sine(ws, i, this.props.frequency, 0) + val)
            ));
          wave.node().old = val;
          updateNum(val);
          return waveArea(arr);
        };
      });
  }

  animate() {
    if (this.props.animationWavesTime) {
      this.animateBackAndForth();
      return;
    }
    this.animateValue();
  }

  draw() {
    const arr = new Array(ch.SAMPLING);
    const container = select(this.container);
    const el = container.select('clipPath').select('path');
    const textValue = container.selectAll(`.${ch.TEXT_VALUE}`);
    const decimalValue = container.selectAll(`.${ch.TEXT_DECIMAL}`);

    textValue.text(parseInt(this.props.value, 10));
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
      <g
        ref={(c) => { this.container = c; }}
        transform={`translate(${d.cx},${d.cy})`}
      >
        {cloneChildren(this.props, d)}
      </g>
    );
  }
}
