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

export const getInnerShape = ({ innerBound, radius, liquidMargin }) => (
  arc()
    .innerRadius(0)
    .outerRadius((innerBound - liquidMargin) * radius)
    .startAngle(0)
    .endAngle(Math.PI * 2)
);

export const getScales = (props) => {
  console.log(props);
  const { radius } = getDimensions(props);
  console.log(radius);
  const r = radius * (props.innerBound - props.liquidMargin);
  const rx = radius * (props.outerBound);
  const x = scaleLinear().range([-rx, rx]).domain([0, SAMPLING]);
  const y = scaleLinear().range([r, -r]).domain([0, 100]);
  return { x, y, r };
};


export const getWaveArea = (props) => {
  const { x, y, r } = getScales(props);
  const waveArea = (
    area()
      .x((d, i) => x(i))
      .y1(d => r)
  );
  return { waveArea, x, y };
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
        .range([amplitude, amplitude])
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

export const sine = (a, i, f, s) =>
  a * Math.sin((((Math.PI * 2) / SAMPLING) * i * f) + s);

export const getWaveValueMovement = (node) => {
  const isForth = node.M === 1;
  const amplitudeTo = isForth ? -1 : 1;
  const currAmplitude = node.A || -1;
  const currFreq = node.F || 0;
  const amplitudeScale = (
    scaleLinear()
      .range([currAmplitude, 0, 1])
      .domain([0, 0.5, 1])
  );

  const frequencyScale = (
    scaleLinear()
      .range([currFreq, 0])
      .domain([0, 1])
  );

  return {
    amplitudeScale,
    frequencyScale,
  };
};

export const getBackAndForth = () => {
  const forthFrequency = (
    scaleLinear()
      .range([0, Math.PI])
      .domain([0, 1])
  );
  const backFrequency = (
    scaleLinear()
      .range([Math.PI, 0])
      .domain([0, 1])
  );
  const forthAmplitude = (
    scaleLinear()
      .range([1, -1])
      .domain([0, 1])
  );
  const backAmplitude = (
    scaleLinear()
      .range([-1, 1])
      .domain([0, 1])
  );
  return { forthFrequency, backFrequency, forthAmplitude, backAmplitude };
};

