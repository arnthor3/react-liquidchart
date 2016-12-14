'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Liquid = require('./Liquid');

var _Liquid2 = _interopRequireDefault(_Liquid);

var _Gradient = require('./Gradient');

var _Gradient2 = _interopRequireDefault(_Gradient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LiquidChart = function LiquidChart(props) {
  return _react2.default.createElement(
    _Chart2.default,
    _extends({
      childRules: false
    }, props),
    _react2.default.createElement(_Liquid2.default, null),
    _react2.default.createElement(_Gradient2.default, null)
  );
};

exports.default = LiquidChart;