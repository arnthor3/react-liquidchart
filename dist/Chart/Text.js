"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function Text(props, _ref) {
  var fill = _ref.fill,
      stroke = _ref.stroke;
  return _react2.default.createElement(
    "text",
    {
      textAnchor: "middle",
      fontSize: props.fontSize,
      fill: fill,
      stroke: stroke
    },
    _react2.default.createElement(
      "tspan",
      { className: "value" },
      props.value
    ),
    _react2.default.createElement(
      "tspan",
      { fontSize: props.smallFontSize },
      "%"
    )
  );
};

Text.propTypes = {
  value: _react.PropTypes.number,
  smallFontSize: _react.PropTypes.string,
  fontSize: _react.PropTypes.string
};

exports.default = Text;