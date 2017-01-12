import React, { PropTypes } from 'react';
import Chart from 'react-offcharts-core/dist/Components/Chart';
import ReactIf from 'react-offcharts-core/dist/Components/ReactIf';
import Gradients from 'react-offcharts-core/dist/Components/Defs/Gradients';
import guid from 'react-offcharts-core/dist/Utils/guid';
import Clip from './Clip';
import Text from './Text';
import Shape from './Shape';
import Liquid from './Liquid';

const LiquidChart = props => (
  <Chart
    width={props.width}
    height={props.height}
    responsive={props.responsive}
    value={props.value}
    clipId={guid()}
    gradientId={guid()}
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
          deliminator={props.deliminator}
          poestfix={props.postfix}
          valueFontSize={props.valueFontSize}
          decimalFontSize={props.decimalFontSize}
          postfixFontSize={props.postfixFontSize}
          legend={props.legend}
          legendFontSize={props.legendFontSize}
        />
      </Shape>
      <ReactIf condition={props.gradientType} el={<g />}>
        <Gradients
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
  outerStyle: PropTypes.shape({}),
  liquidStyle: PropTypes.shape({}),
  wetStyle: PropTypes.shape({}),
  dryStyle: PropTypes.shape({}),
  deliminator: PropTypes.string,
  postfix: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  legend: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  legendFontSize: PropTypes.number,
  valueFontSize: PropTypes.number,
  postfixFontSize: PropTypes.number,
  decimalFontSize: PropTypes.number,
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
};

export default LiquidChart;

