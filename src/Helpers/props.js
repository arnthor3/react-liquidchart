import { PropTypes } from 'react';

export const dShape = PropTypes.shape({
  dx: PropTypes.number,
  dy: PropTypes.number,
});

export const fillAndStroke = PropTypes.shape({
  fill: PropTypes.string,
  stroke: PropTypes.string,
});
