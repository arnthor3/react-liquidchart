'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cloneChildren = require('./Helpers/cloneChildren');

var _cloneChildren2 = _interopRequireDefault(_cloneChildren);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PieContainer = function PieContainer(props) {
  // Let the props on the children have higher priority
  // pass in all the data and chart widths
  var cloneChildrenWithProps = (0, _cloneChildren2.default)(props.children, props);
  // Set the chart center
  var cX = props.width * props.offsetX / 2;
  var cY = props.height * props.offsetY / 2;
  return _react2.default.createElement(
    'g',
    {
      transform: 'translate(' + cX + ',' + cY + ')',
      ref: function ref(c) {
        return props.getElement(c);
      }
    },
    cloneChildrenWithProps
  );
};

PieContainer.propTypes = {
  height: _react.PropTypes.number,
  width: _react.PropTypes.number,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  offsetY: _react.PropTypes.number,
  offsetX: _react.PropTypes.number,
  getElement: _react.PropTypes.func
};

PieContainer.defaultProps = {
  startAngle: 0,
  endAngle: Math.PI * 2,
  offsetY: 1,
  offsetX: 1,
  getElement: function getElement() {}
};

exports.default = PieContainer;