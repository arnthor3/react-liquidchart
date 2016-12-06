import React, {
  PropTypes,
  Children,
  cloneElement,
} from 'react';
import cloneChildren from './Helpers/cloneChildren';

const PieContainer = (props) => {
  // Let the props on the children have higher priority
  // pass in all the data and chart widths
  const cloneChildrenWithProps = cloneChildren(props.children, props);
  // Set the chart center
  const cX = (props.width * props.offsetX) / 2;
  const cY = (props.height * props.offsetY) / 2;
  return (
    <g
      transform={`translate(${cX},${cY})`}
      ref={c => props.getElement(c)}
    >
      {cloneChildrenWithProps}
    </g>
  );
};

PieContainer.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  offsetY: PropTypes.number,
  offsetX: PropTypes.number,
  getElement: PropTypes.func,
};

PieContainer.defaultProps = {
  startAngle: 0,
  endAngle: Math.PI * 2,
  offsetY: 1,
  offsetX: 1,
  getElement: () => {},
};

export default PieContainer;

