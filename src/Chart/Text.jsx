import React, { Component, PropTypes } from 'react';

const Text = (props, { fill, stroke }) => (
  <text
    textAnchor="middle"
    fontSize={props.fontSize}
    fill={fill}
    stroke={stroke}
    dy={props.dy}
    dx={props.dx}
  >
    <tspan className="value">{props.value}</tspan>
    <tspan fontSize={props.smallFontSize}>%</tspan>
  </text>
);

Text.propTypes = {
  value: PropTypes.number,
  smallFontSize: PropTypes.string,
  fontSize: PropTypes.string,
  dy: PropTypes.string,
  dx: PropTypes.string,
};

export default Text;
