'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (children, props) {
  var childRules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return (
    // Clone the children and add props to components like data, width and heigth
    _react.Children.map(children, function (child) {
      // only pass data into Components not native browser elements
      var isComponent = typeof child.type !== 'string';
      if (isComponent) {
        var childProps = childRules ? Object.assign({}, props, child.props) : Object.assign({}, child.props, props);
        return _react2.default.cloneElement(child,
        // user can overwrite props on children
        childProps);
      }
      return _react2.default.cloneElement(child);
    })
  );
};