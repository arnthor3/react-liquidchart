import React, { PropTypes } from 'react';
import Chart from 'react-offcharts-core/Components/Chart';
import ReactIf from 'react-offcharts-core/Components/ReactIf';
import Gradients from 'react-offcharts-core/Components/Defs/Gradients';
import guid from 'react-offcharts-core/Utils/guid';
import Clip from './Clip';
import Text from './Text';
import Shape from './Shape';
import Liquid from './Liquid';
import { dShape, fillAndStroke } from '../Helpers/props';

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
      gradient={props.gradientType}
    >
      <Shape
        type={props.type}
        outerStyle={props.outerStyle}
        liquidStyle={props.liquidStyle}
        wetStyle={props.wetStyle}
        dryStyle={props.dryStyle}
      >
        <Text
          deliminator={props.deliminator}
          postfix={props.postfix}
          showDecimal={props.showDecimal}
          valueFontSize={props.valueFontSize}
          valueD={props.valueD}
          decimalFontSize={props.decimalFontSize}
          decimalD={props.decimalD}
          postfixFontSize={props.postfixFontSize}
          postfixD={props.postfixD}
          legend={props.legend}
          legendFontSize={props.legendFontSize}
          legendD={props.legendD}
        />
      </Shape>
      <ReactIf condition={props.gradientType} el={<g />}>
        <Gradients
          id={gradientId}
          type={props.gradientType}
          x={props.gradientX}
          y={props.gradientY}
          x1={props.gradientX1}
          y1={props.gradientY1}
          x2={props.gradientX2}
          y2={props.gradientY2}
          cx={props.gradientCx}
          cy={props.gradientCy}
          fx={props.gradientFx}
          fy={props.gradientFy}
          r={props.gradientR}
          fill={props.liquidStyle.fill}
          stops={props.stops}
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
  deliminator: PropTypes.string,
  postfix: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  legend: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  showDecimal: PropTypes.bool,
  legendFontSize: PropTypes.number,
  legendD: dShape,
  valueFontSize: PropTypes.number,
  valueD: dShape,
  postfixFontSize: PropTypes.number,
  postfixD: dShape,
  decimalFontSize: PropTypes.number,
  decimalD: dShape,
  gradientType: PropTypes.number,
  gradientR: PropTypes.number,
  gradientX: PropTypes.number,
  gradientX1: PropTypes.number,
  gradientX2: PropTypes.number,
  gradientY: PropTypes.number,
  gradientY1: PropTypes.number,
  gradientY2: PropTypes.number,
  gradientCx: PropTypes.number,
  gradientCy: PropTypes.number,
  gradientFx: PropTypes.number,
  gradientFy: PropTypes.number,
  stops: PropTypes.arrayOf(PropTypes.node),
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
  gradientX1: 0,
  gradientX2: 0,
  gradientY1: 100,
  gradientY2: 0,
};

export default LiquidChart;

