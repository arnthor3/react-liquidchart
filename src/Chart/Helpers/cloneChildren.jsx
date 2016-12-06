import React, { Children, cloneElement } from 'react';

export default (children, props) => (
  // Clone the children and add props to components like data, width and heigth
    Children.map(children,
      (child) => {
        // only pass data into Components not native browser elements
        const isComponent = typeof child.type !== 'string';
        if (isComponent) {
          return React.cloneElement(
            child,
            // user can overwrite props on children
            Object.assign({}, props, child.props),
          );
        }
        return React.cloneElement(child);
      })
);
