import { PropTypes } from 'react';

export const dShape = PropTypes.shape({
  dx: PropTypes.number,
  dy: PropTypes.number,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  fontSize: PropTypes.number,
});

export const fillAndStroke = PropTypes.shape({
  fill: PropTypes.string,
  stroke: PropTypes.string,
});

export const gradient = PropTypes.shape({
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
});
