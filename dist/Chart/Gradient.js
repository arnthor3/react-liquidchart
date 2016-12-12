'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Color = require('d3-color');

var d3Color = _interopRequireWildcard(_d3Color);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Defs = function Defs(_ref) {
  var x1 = _ref.x1,
      x2 = _ref.x2,
      y1 = _ref.y1,
      y2 = _ref.y2,
      gradient = _ref.gradient,
      children = _ref.children,
      fill = _ref.fill;

  var rendered = children;
  if (!children || children.length === 0) {
    var col = d3Color.color(fill);
    rendered = [_react2.default.createElement('stop', { key: 0, stopColor: col.darker(0.5), offset: '0%' }), _react2.default.createElement('stop', { key: 1, stopColor: col.darker(0.15), offset: '25%' }), _react2.default.createElement('stop', { key: 2, stopColor: fill, offset: '50%' }), _react2.default.createElement('stop', { key: 3, stopColor: col.brighter(0.45), offset: '65%' }), _react2.default.createElement('stop', { key: 4, stopColor: col.brighter(1), offset: '100%' })];
  }
  return _react2.default.createElement(
    'defs',
    null,
    _react2.default.createElement(
      'linearGradient',
      {
        x1: x1,
        x2: x2,
        y1: y1,
        y2: y2,
        id: gradient
      },
      rendered
    )
  );
};

Defs.propTypes = {
  x1: _react.PropTypes.string,
  x2: _react.PropTypes.string,
  y1: _react.PropTypes.string,
  y2: _react.PropTypes.string,
  gradient: _react.PropTypes.string,
  fill: _react.PropTypes.string,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node])
};

Defs.defaultProps = {
  x1: '0%',
  x2: '100%',
  y1: '0%',
  y2: '0%'
};

exports.default = Defs;