import React, { PropTypes } from 'react';
import * as ch from '../Helpers/constants';

const LiquidText = props => {
  console.log(props);
  return (
  <g>
    <text {...props.style} textAnchor="middle">
      <tspan
        className={ch.TEXT_VALUE}
        fontSize={props.valueFontSize * props.radius}
      />
      <tspan
        className={ch.TEXT_DECIMAL}
        fontSize={props.decimalFontSize * props.radius}
      />
      <tspan
        className={ch.TEXT_POSTFIX}
        fontSize={props.postfixFontSize * props.radius}
      >{props.postfix}</tspan>
    </text>
    <text
      {...props.style}
      className={ch.TEXT_LEGEND}
      dy={props.radius * 0.15}
      fontSize={props.radius * 0.1}
      textAnchor="middle"
    >{props.legend}</text>
  </g>
  );
};

LiquidText.propTypes = {
  valueFontSize: PropTypes.number,
  decimalFontSize: PropTypes.number,
  postfixFontSize: PropTypes.number,
  radius: PropTypes.number,
  postfix: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  legend: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  style: PropTypes.shape({}),
};

export default LiquidText;
