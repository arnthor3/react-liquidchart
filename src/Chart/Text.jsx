import React, { PropTypes } from 'react';
import * as ch from '../Helpers/constants';

const LiquidText = props => (
  <g>
    <text {...props.style} textAnchor="middle">
      <tspan
        className={ch.TEXT_VALUE}
        fontSize={props.valueFontSize * props.radius}
        {...props.valueD}
      />
      <tspan
        className={ch.TEXT_DECIMAL}
        dx={(props.decimalFontSize * props.radius) * -0.1}
        fontSize={props.decimalFontSize * props.radius}
        {...props.decimalD}
      />
      <tspan
        className={ch.TEXT_POSTFIX}
        fontSize={props.postfixFontSize * props.radius}
        {...props.postfixD}
      >{props.postfix}</tspan>
    </text>
    <text
      {...props.style}
      className={ch.TEXT_LEGEND}
      dy={props.radius * (props.legendFontSize + 0.05)}
      fontSize={props.radius * props.legendFontSize}
      textAnchor="middle"
      {...props.legendD}
    >{props.legend}</text>
  </g>
);

const dShape = PropTypes.shape({
  dx: PropTypes.number,
  dy: PropTypes.number,
});

LiquidText.propTypes = {
  valueFontSize: PropTypes.number,
  decimalFontSize: PropTypes.number,
  postfixFontSize: PropTypes.number,
  legendFontSize: PropTypes.number,
  radius: PropTypes.number,
  postfix: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  legend: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  style: PropTypes.shape({}),
  postfixD: dShape,
  decimalD: dShape,
  valueD: dShape,
  legendD: dShape,
};

LiquidText.defaultProps = {
  valueFontSize: 0.5,
  decimalFontSize: 0.35,
  postfixFontSize: 0.25,
  legendFontSize: 0.1,
};

export default LiquidText;
