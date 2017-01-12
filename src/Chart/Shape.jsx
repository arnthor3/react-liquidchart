import React, { PropTypes } from 'react';
import cloneChildren from 'react-offcharts-core/dist/Utils/cloneChildren';

import * as ch from '../Helpers/constants';
import { getOuterShape, getInnerShape } from '../Helpers/dimensions';

const Shape = props => (
  <g className={ch.MAIN}>
    <g className={ch.OUTER}>
      <path
        d={getOuterShape(props)()}
        {...props.outerStyle}
      />
      {cloneChildren(props, { style: props.dryStyle })}
    </g>
    <g className={ch.INNER} clipPath={`url(#${props.clipId})`}>
      <path d={getInnerShape(props)()} />
      {cloneChildren(props, { style: props.wetStyle })}
    </g>
  </g>
);

Shape.propTypes = {
  outerStyle: PropTypes.shape({}),
  wetStyle: PropTypes.shape({}),
  dryStyle: PropTypes.shape({}),
  clipId: PropTypes.string,
};

export default Shape;
