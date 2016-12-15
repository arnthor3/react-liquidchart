import React, { Component, PropTypes } from 'react';
import { timer } from 'd3-timer';
import { arc, area } from 'd3-shape';
import * as ease from 'd3-ease';
import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { interpolate } from 'd3-interpolate';
import * as d3Color from 'd3-color';
import 'd3-transition';
import ReactIf from './ReactIf';
import Text from './Text';

/*
  PropType for fill and stroke..
 */
const fillStroke = PropTypes.shape({
  fill: PropTypes.string,
  stroke: PropTypes.string,
});

export default class LiquidChart extends Component {
  static propTypes = {
    // a percentage from 0 to 100
    value: PropTypes.number,
    // boolean if true then animate
    animate: PropTypes.bool,
    // comes from Chart parent
    width: PropTypes.number,
    // comes from Chart parent
    height: PropTypes.number,
    // innerRadius
    innerRadius: PropTypes.number,
    // outer radius
    outerRadius: PropTypes.number,
    // margin between inner liquid and innerRadius
    margin: PropTypes.number,
    // callback function called when animation is done
    onEnd: PropTypes.func,
    // string
    ease: PropTypes.string,
    // animation Time
    animationTime: PropTypes.number,
    // animation wave time
    animationWavesTime: PropTypes.number,
    // The fill and stroke for the outer arc
    outerArcStyle: fillStroke,
    // The fill and stroke for the liquid
    liquid: fillStroke,
    // The fill and stroke for the number part that
    // is drenched in liquid
    liquidNumber: fillStroke,
    // the fill and stroke of the number that is not drenched in liquid
    number: fillStroke,
    // the wave amplitude
    amplitude: PropTypes.number,
    // the wave frequncy inverse, the higer the number the fewer the waves
    frequency: PropTypes.number,
    // scaling the wave when it´s close to 0 or 100
    waveScaleLimit: PropTypes.bool,
    // on click
    onClick: PropTypes.func,
    // if true then animate waves
    animateWaves: PropTypes.bool,
    // if this string has value then the gradient will be set
    gradient: PropTypes.bool,
  }

  static defaultProps = {
    value: 65,
    animate: false,
    outerRadius: 0.9,
    innerRadius: 0.8,
    margin: 0.025,
    ease: 'easeCubicInOut',
    animationTime: 2000,
    animationWavesTime: 2000,
    amplitude: 2,
    waveScaleLimit: true,
    frequency: 4,
    outerArcStyle: {
      fill: 'rgb(23, 139, 202)',
    },
    liquid: {
      fill: 'rgb(23, 139, 202)',
    },
    liquidNumber: {
      fill: 'rgb(164, 219, 248)',
    },
    number: {
      fill: 'rgb(4, 86, 129)',
    },
    offsetX: 1,
    offsetY: 1,
    onClick: () => {},
    fontSize: '7rem',
    smallFontSize: '3rem',
  };

  componentDidMount() {
    if (this.props.animate) {
      this.animate();
      return;
    }
    this.draw();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.animate) {
      this.animate();
      return;
    }
    this.draw();
  }

  setRes() {
    // set an array filled with zeros,
    // we are just going to use the index anyways
    this.arr = new Array(100);
    // get the clip path
    this.wave = select(this.clipPath).datum([this.props.value]);
    // get the tspan
    this.text = select(this.container)
                  .selectAll('text')
                  .selectAll('tspan.value');

    const height = (this.props.height * (this.props.innerRadius - this.props.margin)) / 2;
    // to animate the wave we need to set the width of the path double the diameter
    // of the liquid.
    this.x = scaleLinear().range([-this.liquidRadius * 2, this.liquidRadius * 2]).domain([0, 100]);
    this.y = scaleLinear().range([height, -height]).domain([0, 100]);
  }

  draw() {
    // ready the chart
    this.setRes();
    // some basic trig
    const val = area()
                  .x((d, i) => this.x(i))
                  .y0((d, i) => this.y(
                    (this.props.amplitude * Math.sin(i / this.props.frequency)) +
                    this.props.value))
                  .y1(d => this.props.height / 2);
    // set the clip path d attribute
    this.wave.attr('d', val(this.arr));
    // set the text to the rounded value
    // decimal formatting todo
    this.text.text(Math.round(this.props.value));
  }

  animate() {
    // set the ease
    const easeFn = ease[this.props.ease] ? ease[this.props.ease] : ease.easeCubicInOut;
    // ready the chart and do calculations
    this.setRes();
    const val = area()
                  .x((d, i) => this.x(i))
                  .y1(d => this.props.height / 2);
    // reduce the wave when it's close to 0 or 100
    let waveScale;
    if (this.props.waveScaleLimit) {
      waveScale = scaleLinear()
                    .range([0, this.props.amplitude, 0])
                    .domain([0, 50, 100]);
    } else {
      waveScale = scaleLinear()
                    .range([this.props.amplitude, this.props.amplitude])
                    .domain([0, 50, 100]);
    }

    if (this.props.animateWaves) {
      this.animateWave();
    }
    // the d3 timer goes from from 0 to 1
    const time = scaleLinear().range([0, 1]).domain([0, this.props.animationTime]);
    // if the wave does not have old value then interpolate from 0 to value else old to value
    const interpolateValue = interpolate(this.wave.node().old || 0, this.props.value);

    // start animation
    const animationTimer = timer((t) => {
      // set the easing
      const animate = easeFn(time(t));
      const value = interpolateValue(animate);
      // calculate the wave
      val.y0((d, i) => this.y(
        (waveScale(value) * Math.sin(i / this.props.frequency))
        + value));
      // set the text value
      this.text.text(Math.round(value));
      // set the wave data attribute
      this.wave.attr('d', val(this.arr));
      // the transition has ended
      if (t >= this.props.animationTime) {
        // stop the timer
        animationTimer.stop();
        // Make sure that the animation stops in the right place
        // we set 1 as the interpolation parameter
        val.y0((d, i) => this.y(
          (waveScale(this.props.value) * Math.sin(i / this.props.frequency))
          + interpolateValue(1)));
        this.text.text(Math.round(interpolateValue(1)));
        this.wave.attr('d', val(this.arr));
        // if the onEnd prop is set then call the function
        if (this.props.onEnd !== undefined) {
          this.props.onEnd();
        }
      }
    });
    // Store the old node value so that we can animate from
    // that point again
    this.wave.node().old = this.props.value;
  }
  // animate the wave from 0 to liquidRadius repeat
  // not perfect but works
  animateWave() {
    // put a lock on animate function
    // so it's not called often
    if (!this.isOn) {
      this.isOn = true;
      const anime = () => {
        this.wave
          .attr('transform', 'translate(0,0)')
          .transition()
          .duration(this.props.animationWavesTime)
          .ease(ease.easeLinear)
          .attr('transform', `translate(${this.liquidRadius},0)`)
          .on('end', () => {
            anime();
          });
      };
      anime();
    }
  }

  render() {
    this.radius = Math.min(this.props.height / 2, this.props.width / 2);
    this.liquidRadius = this.radius * (this.props.innerRadius - this.props.margin);
    // set the outerArc arc parameters
    const outerArc = arc()
                      .outerRadius(this.props.outerRadius * this.radius)
                      .innerRadius(this.props.innerRadius * this.radius)
                      .startAngle(0)
                      .endAngle(Math.PI * 2);
    // set the chart center
    const cX = this.props.width / 2;
    const cY = this.props.height / 2;

    let fillCircle = this.props.liquid.fill;

    if (this.props.gradient) {
      fillCircle = `url(#${this.props.gradient})`;
    }
    return (
      <g
        transform={`translate(${cX},${cY})`}
        ref={(c) => { this.container = c; }}
      >
        <defs>
          <clipPath
            id="clip"
          >
            <path
              ref={(c) => { this.clipPath = c; }}
            />
          </clipPath>
        </defs>
        {Text(this.props, this.props.number)}
        <g clipPath="url(#clip)">
          <circle
            r={this.liquidRadius}
            fill={fillCircle}
          />
          {Text(this.props, this.props.liquidNumber)}
        </g>
        <path
          d={outerArc()}
          fill={this.props.outerArcStyle.fill}
          stroke={this.props.outerArcStyle.stroke}
        />
        <circle
          r={this.radius}
          fill="rgba(0,0,0,0)"
          stroke="rgba(0,0,0,0)"
          style={{ pointerEvents: 'all' }}
          onClick={() => { this.props.onClick(); }}
        />
      </g>
    );
  }
}
