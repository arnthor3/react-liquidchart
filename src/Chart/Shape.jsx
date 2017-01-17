import React, { PropTypes } from 'react';
import cloneChildren from 'react-offcharts-core/Utils/cloneChildren';
import * as ch from '../Helpers/constants';
import { getOuterShape, getInnerShape } from '../Helpers/dimensions';
import { fillAndStroke } from '../Helpers/props';

const Shape = (props) => {
  const liquidFill = props.gradientId ? `url(#${props.gradientId})` : props.liquidStyle.fill;
  return (
    <g className={ch.MAIN}>
      <g className={ch.OUTER}>
        <path
          d={getOuterShape(props)()}
          {...props.outerStyle}
        />
        {cloneChildren(props, { style: props.dryStyle })}
      </g>
      <g className={ch.INNER} clipPath={`url(#${props.clipId})`}>
        <path
          d={getInnerShape(props)()}
          fill={liquidFill}
        />
        {cloneChildren(props, { style: props.wetStyle })}
      </g>
    </g>
  );
};

Shape.propTypes = {
  liquidStyle: fillAndStroke,
  outerStyle: fillAndStroke,
  wetStyle: fillAndStroke,
  dryStyle: fillAndStroke,
  clipId: PropTypes.string,
  gradientId: PropTypes.string,
};

Shape.defaultProps = {
  liquidStyle: {},
  outerStyle: {},
  wetStyle: {},
  dryStyle: {},
};

export default Shape;
