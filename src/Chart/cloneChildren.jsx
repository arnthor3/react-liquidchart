import React, { Children, cloneElement } from 'react';

export default (children, props, childRules = true) => (
    // Clone the children and add props to components like data, width and heigth
  Children.map(children,
    (child) => {
      // only pass data into Components not native browser elements
      const isComponent = typeof child.type !== 'string';
      if (isComponent) {
        const childProps = childRules ?
          Object.assign({}, props, child.props) :
          Object.assign({}, child.props, props);
        return React.cloneElement(
          child,
          // user can overwrite props on children
          childProps,
        );
      }
      return React.cloneElement(child);
    })
);
