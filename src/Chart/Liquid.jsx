import React, { Component, PropTypes } from 'react';
import { timer } from 'd3-timer';
import { arc, area } from 'd3-shape';
import * as ease from 'd3-ease';
import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { interpolate } from 'd3-interpolate';
import * as d3Color from 'd3-color';
import ReactIf from './ReactIf';
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
    // d3 easing functions
    ease: PropTypes.func,
    // animation Time
    animationTime: PropTypes.number,
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
    // on click
    onClick: PropTypes.func,
    offsetY: PropTypes.number,
    offsetX: PropTypes.number,
    // Font size for the number
    fontSize: PropTypes.string,
    // font size for the percentage
    smallFontSize: PropTypes.string,
    animateWaves: PropTypes.bool,
    gradient: PropTypes.bool,
  }

  static defaultProps = {
    value: 65,
    animate: false,
    outerRadius: 0.9,
    innerRadius: 0.8,
    margin: 0.025,
    ease: ease.easeCubicInOut,
    animationTime: 2000,
    amplitude: 2,
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
    this.arr = new Array(100);
    this.wave = select(this.clipPath).datum([this.props.value]);
    this.text = select(this.container)
                  .selectAll('text').selectAll('tspan.value');
    const width = (this.props.width * this.props.innerRadius) / 2;
    const height = (this.props.height * (this.props.innerRadius - this.props.margin)) / 2;

    this.x = scaleLinear().range([-this.liquidRadius * 2, this.liquidRadius * 2]).domain([0, 100]);
    this.y = scaleLinear().range([height, -height]).domain([0, 100]);
  }

  draw() {
    this.setRes();

    const val = area()
                    .x((d, i) => this.x(i))
                    .y0((d, i) => this.y(
                      (this.props.amplitude * Math.sin(i / this.props.frequency)) +
                      this.props.value))
                    .y1(d => this.props.height / 2);
    this.wave.attr('d', val(this.arr));
    this.text.text(Math.round(this.props.value));
  }

  animate() {
    this.setRes();
    const val = area()
                    .x((d, i) => this.x(i))
                    .y0((d, i) => this.y(Math.sin(i / 4)))
                    .y1(d => this.props.height / 2);

    const time = scaleLinear().range([0, 1]).domain([0, this.props.animationTime]);
    const interpolateValue = interpolate(this.wave.node().old || 0, this.props.value);
    const interpolateWave = interpolate(0, this.liquidRadius);

    const animationTimer = timer((t) => {
      const animate = this.props.ease(time(t));
      val.y0((d, i) => this.y(
        (this.props.amplitude * Math.sin(i / this.props.frequency))
        + interpolateValue(animate)));

      this.text.text(Math.round(interpolateValue(animate)));

      this.wave.attr('d', val(this.arr));

      if (this.props.animateWaves) {
        const animateWave = ease.easeSinInOut(time(t));
        this.wave.attr('transform', `translate(${interpolateWave(animateWave)},0)`);
      }
      // the transition has ended
      if (t >= this.props.animationTime) {
        animationTimer.stop();
        // Make sure that the animation stops in the right place
        this.text.text(Math.round(interpolateValue(1)));
        this.wave.attr('d', val(this.arr));
        if (this.props.animateWaves) {
          this.wave.attr('transform', `translate(${interpolateWave(1)},0)`);
        }
        this.text.text(Math.round(this.props.value));
        // if the onEnd prop is set then call the function
        if (this.props.onEnd !== undefined) {
          this.props.onEnd();
        }
      }
    });
    // Store the old node value so that we can animate from
    // that point
    this.wave.node().old = this.props.value;
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
    const cX = (this.props.width * this.props.offsetX) / 2;
    const cY = (this.props.height * this.props.offsetY) / 2;

    // store the color for the gradient effect
    const col = d3Color.color(this.props.liquid.fill);
    const colNumbers = d3Color.color(this.props.liquidNumber.fill);

    let fillCircle = this.props.liquid.fill;
    if (this.props.gradient) {
      fillCircle = 'url(#GradientLiquidCircle)';
    }

    return (
      <g
        transform={`translate(${cX},${cY})`}
        ref={(c) => { this.container = c; }}
      >
        <ReactIf
          condition={this.props.gradient}
          el={<defs />}
        >
          <linearGradient id="GradientLiquidCircle">
            <stop
              offset="5%"
              stopColor={this.props.liquid.fill}
              x1="0%"
              y1="0%"
              x2="35%"
              y2="45%"
            />
            <stop
              offset="55%"
              stopColor={col.brighter(1)}
              x1="35%"
              x2="100%"
              y1="45%"
              y2="100%"
            />
          </linearGradient>
        </ReactIf>
        <defs>
          <clipPath
            id="clip"
          >
            <path
              ref={(c) => { this.clipPath = c; }}
            />
          </clipPath>
        </defs>
        <text
          textAnchor="middle"
          fontSize={this.props.fontSize}
          fill={this.props.number.fill}
          stroke={this.props.number.stroke}
        >
          <tspan className="value">{this.props.value}</tspan>
          <tspan fontSize={this.props.smallFontSize}>%</tspan>
        </text>
        <g
          clipPath="url(#clip)"
        >
          <circle
            r={this.liquidRadius}
            fill={fillCircle}
          />
          <text
            textAnchor="middle"
            fontSize={this.props.fontSize}
            fill={this.props.liquidNumber.fill}
            stroke={this.props.liquidNumber.stroke}
          >
            <tspan className="value">{this.props.value}</tspan>
            <tspan fontSize={this.props.smallFontSize}>%</tspan>
          </text>
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
