import React, { PropTypes } from 'react';
import Chart from './Chart';
import Liquid from './Liquid';
import Gradient from './Gradient';

const LiquidChart = props => (
  <Chart
    childRules={false}
    {...props}
  >
    <Liquid />
    <Gradient />
  </Chart>
);

export default LiquidChart;
