import React, { Children, PropTypes } from 'react';
/*
  A template function that renders children if the condition is true
 */
const ReactIf = ({ children, condition, el }) => {
  if (!condition) {
    return null;
  }
  return React.cloneElement(el, { children });
};

ReactIf.defaultProps = {
  el: <span />,
};

ReactIf.PropTypes = {
  // a boolean condition if true then render
  condition: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  // The user can pass in any element type
  // that will act as the parent node
  el: PropTypes.node,
};

export default ReactIf;
