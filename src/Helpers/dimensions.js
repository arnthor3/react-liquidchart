import { arc, area } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { SAMPLING } from './constants';

export const getDimensions = ({ width, height, chartMargin = 0 }) => {
  const cx = (width - (chartMargin / 2)) / 2;
  const cy = (height - (chartMargin / 2)) / 2;
  const radius = Math.min(cx, cy);
  return { cx, cy, radius };
};

export const getOuterShape = ({ outerBound, innerBound, radius }) => (
  arc()
    .innerRadius(innerBound * radius)
    .outerRadius(outerBound * radius)
    .startAngle(0)
    .endAngle(Math.PI * 2)
);

export const getInnerShape = ({ innerBound, radius, liquidMargin = 0.0025 }) => (
  arc()
    .innerRadius(0)
    .outerRadius((innerBound - liquidMargin) * radius)
    .startAngle(0)
    .endAngle(Math.PI * 2)
);

export const getScales = ({ height, width, innerBound, liquidMargin }) => {
  const h = ((height * (innerBound - liquidMargin)) / 2);
  const w = ((width * (innerBound - liquidMargin)) / 2);
  const x = scaleLinear().range([-w, w]).domain([0, SAMPLING]);
  const y = scaleLinear().range([h, -h]).domain([0, 100]);
  return { w, h, x, y };
};


export const getWaveArea = (props) => {
  const { x, y, w, h } = getScales(props);
  const waveArea = (
    area()
      .x((d, i) => x(i))
      .y1(d => h)
  );
  return { waveArea, x, y, w, h };
};

export const getWaveScaleLimit = ({ waveScaleLimit, amplitude }) => {
  if (waveScaleLimit) {
    return (
      scaleLinear()
        .range([0, amplitude, 0])
        .domain([0, 50, 100])
    );
  }
  return (
    scaleLinear()
      .range([amplitude])
      .domain([0, 100])
  );
};

export const getWave = (props) => {
  const { x, y, h, w } = getScales(props);
  const sine = (a, i, f) => a * (Math.sin((((Math.PI * 2) / SAMPLING) * i * f)));
  const waveScale = getWaveScaleLimit(props);
  return (
    area()
      .x((d, i) => x(i))
      .y0((d, i) => y(sine(waveScale(props.value), i, 4) + props.value))
      .y1(d => h)
  );
};

export const getWaves = (props) => {
  const { y, h, w } = getScales(props);
  const x = scaleLinear().range([-w, w]).domain([0, SAMPLING * 0.80]);
  const x2 = scaleLinear().range([-w, w]).domain([0, SAMPLING * 1]);
  const M = (Math.PI * 2) / SAMPLING;
  const sine = (a, i, f) => (
    a * Math.sin((M * i * f))
  );
  const sine2 = (a, i, f) => (
    -a * Math.sin((M * i * f))
  );

  const waveScale = getWaveScaleLimit(props);
  const waveOne = (
    area()
      .x((d, i) => x(i))
      .y0((d, i) => y(sine2(waveScale(props.value), i, props.frequency) + props.value))
      .y1(d => h)
  );
  const waveTwo = (
    area()
      .x((d, i) => x2(i))
      .y0((d, i) => y(sine(waveScale(props.value), i, props.frequency) + props.value))
      .y1(d => h)
  );
  return {
    waveOne, waveTwo,
  };
};
