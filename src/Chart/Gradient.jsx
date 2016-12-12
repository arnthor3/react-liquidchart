import React, { Component, PropTypes } from 'react';
import * as d3Color from 'd3-color';

const Defs = ({ x1, x2, y1, y2, gradient, children, fill }) => {
  let rendered = children;
  if (!children || children.length === 0) {
    const col = d3Color.color(fill);
    rendered = [
      <stop key={0} stopColor={col.darker(0.5)} offset="0%" />,
      <stop key={1} stopColor={col.darker(0.15)} offset="25%" />,
      <stop key={2} stopColor={fill} offset="50%" />,
      <stop key={3} stopColor={col.brighter(0.45)} offset="65%" />,
      <stop key={4} stopColor={col.brighter(1)} offset="100%" />,
    ];
  }
  return (
    <defs>
      <linearGradient
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
        id={gradient}
      >
        {rendered}
      </linearGradient>
    </defs>
  );
};

Defs.propTypes = {
  x1: PropTypes.string,
  x2: PropTypes.string,
  y1: PropTypes.string,
  y2: PropTypes.string,
  gradient: PropTypes.string,
  fill: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Defs.defaultProps = {
  x1: '0%',
  x2: '100%',
  y1: '0%',
  y2: '0%',
};

export default Defs;
