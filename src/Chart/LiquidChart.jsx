import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-offcharts-core/Components/Chart';
import ReactIf from 'react-offcharts-core/Components/ReactIf';
import Gradients from 'react-offcharts-core/Components/Defs/Gradients';
import guid from 'react-offcharts-core/Utils/guid';
import Clip from './Clip';
import Text from './Text';
import Shape from './Shape';
import Liquid from './Liquid';
import { dShape, fillAndStroke, gradientProps } from '../Helpers/props';

const gradientId = guid();

const LiquidChart = props => (
  <Chart
    width={props.width}
    height={props.height}
    responsive={props.responsive}
    value={props.value}
    clipId={guid()}
    gradientId={gradientId}
  >
    <Liquid
      outerBound={0.95}
      innerBound={0.85}
      amplitude={props.amplitude}
      frequency={props.frequency}
      waveScaleLimit={props.waveScaleLimit}
      animationWavesTime={props.animationWavesTime}
      animationTime={props.animationTime}
      animationEase={props.animationEase}
    >
      <Shape
        type={props.type}
        outerStyle={props.outerStyle}
        liquidStyle={props.liquidStyle}
        wetStyle={props.wetStyle}
        dryStyle={props.dryStyle}
      >
        <Text
          postfix={props.postfix}
          showDecimal={props.showDecimal}
          fontSizes={props.fontSizes}
          legend={props.legend}
        />
      </Shape>
      <ReactIf condition={props.gradient.type} el={<g />}>
        <Gradients
          id={gradientId}
          {...props.gradient}
          fill={props.liquidStyle.fill}
        />
      </ReactIf>
      <Clip />
    </Liquid>
  </Chart>
);

LiquidChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  responsive: PropTypes.bool,
  value: PropTypes.number,
  amplitude: PropTypes.number,
  frequency: PropTypes.number,
  waveScaleLimit: PropTypes.bool,
  animationWavesTime: PropTypes.number,
  animationEase: PropTypes.string,
  animationTime: PropTypes.number,
  type: PropTypes.number,
  outerStyle: fillAndStroke,
  liquidStyle: fillAndStroke,
  wetStyle: fillAndStroke,
  dryStyle: fillAndStroke,
  // deliminator: PropTypes.string,
  postfix: PropTypes.string,
  legend: PropTypes.string,
  showDecimal: PropTypes.bool,
  fontSizes: PropTypes.shape({
    value: PropTypes.number,
    decimal: PropTypes.number,
    postfix: PropTypes.number,
    legend: PropTypes.number,
  }),
  gradient: PropTypes.shape({
    type: PropTypes.number,
    r: PropTypes.number,
    x: PropTypes.number,
    x1: PropTypes.number,
    x2: PropTypes.number,
    y: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number,
    cx: PropTypes.number,
    cy: PropTypes.number,
    fx: PropTypes.number,
    fy: PropTypes.number,
    stops: PropTypes.arrayOf(PropTypes.node),
  }),
};

LiquidChart.defaultProps = {
  outerBound: 0.9,
  innerBound: 0.85,
  margin: 0.005,
  frequency: 2,
  amplitude: 4,
  waveScaleLimit: true,
  outerStyle: { fill: 'rgb(23,139,202)' },
  liquidStyle: { fill: 'rgb(23, 139, 202)' },
  dryStyle: { fill: 'rgb(4, 86, 129)' },
  wetStyle: { fill: 'rgb(164, 219, 248)' },
  gradient: {
    x1: 0,
    x2: 0,
    y1: 100,
    y2: 0,
  },
};

export default LiquidChart;

