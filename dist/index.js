'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Gradient = exports.Liquid = exports.Chart = undefined;

var _Chart = require('./Chart/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Liquid = require('./Chart/Liquid');

var _Liquid2 = _interopRequireDefault(_Liquid);

var _Gradient = require('./Chart/Gradient');

var _Gradient2 = _interopRequireDefault(_Gradient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LiquidChart = function LiquidChart(props) {
  return React.createElement(
    _Chart2.default,
    props,
    React.createElement(_Liquid2.default, props),
    React.createElement(_Gradient2.default, props)
  );
};

exports.Chart = _Chart2.default;
exports.Liquid = _Liquid2.default;
exports.Gradient = _Gradient2.default;