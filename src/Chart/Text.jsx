import React, { PropTypes } from 'react';
import * as ch from '../Helpers/constants';

const LiquidText = props => (
  <g>
    <text {...props.style} textAnchor="middle">
      <tspan
        className={ch.TEXT_VALUE}
        fontSize={props.fontSizes.value * props.radius}
      />
      { props.showDecimal ?
        <tspan
          className={ch.TEXT_DECIMAL}
          dx={(props.fontSizes.decimal * props.radius) * -0.01}
          fontSize={props.fontSizes.decimal * props.radius}
        /> : null
       }

      <tspan
        className={ch.TEXT_POSTFIX}
        fontSize={props.fontSizes.postfix * props.radius}
      >{props.postfix}</tspan>
    </text>
    <text
      {...props.style}
      className={ch.TEXT_LEGEND}
      dy={props.radius * (props.fontSizes.legend + 0.05)}
      fontSize={props.radius * props.fontSizes.legend}
      textAnchor="middle"
    >{props.legend}</text>
  </g>
);

const dShape = PropTypes.shape({
  dx: PropTypes.number,
  dy: PropTypes.number,
});

LiquidText.propTypes = {
  fontSizes: PropTypes.shape({
    value: PropTypes.string,
    decimal: PropTypes.string,
    postfix: PropTypes.string,
    legend: PropTypes.string,
  }),
  radius: PropTypes.number,
  postfix: PropTypes.string,
  legend: PropTypes.string,
  style: PropTypes.shape({}),
  showDecimal: PropTypes.bool,
};

LiquidText.defaultProps = {
  fontSizes: {
    value: 0.5,
    decimal: 0.35,
    postfix: 0.25,
    legend: 0.1,
  },
};

export default LiquidText;
