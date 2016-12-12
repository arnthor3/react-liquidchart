import Chart from './Chart/Chart';
import Liquid from './Chart/Liquid';
import Gradient from './Chart/Gradient';

const LiquidChart = props => (
  <Chart {...props}>
    <Liquid {...props} />
    <Gradient {...props} />
  </Chart>
);

export { Chart, Liquid, Gradient };
