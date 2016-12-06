'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  A template function that renders children if the condition is true
 */
var ReactIf = function ReactIf(_ref) {
  var children = _ref.children,
      condition = _ref.condition,
      el = _ref.el;

  if (!condition) {
    return null;
  }
  return _react2.default.cloneElement(el, { children: children });
};

ReactIf.defaultProps = {
  el: _react2.default.createElement('span', null)
};

ReactIf.PropTypes = {
  // a boolean condition if true then render
  condition: _react.PropTypes.bool,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  // The user can pass in any element type
  // that will act as the parent node
  el: _react.PropTypes.node
};

exports.default = ReactIf;