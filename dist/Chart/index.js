'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

var _ReactIf = require('./ReactIf');

var _ReactIf2 = _interopRequireDefault(_ReactIf);

var _Liquid = require('./Liquid');

var _Liquid2 = _interopRequireDefault(_Liquid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chart = function (_Component) {
  _inherits(Chart, _Component);

  function Chart(props) {
    _classCallCheck(this, Chart);

    var _this = _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).call(this, props));

    _this.state = {
      width: null,
      height: null
    };
    /*
      if user wants to rerender for all resize events then store the function
      as this.resize and throttle it so it does not refire many times during resize
    */
    if (_this.props.responsive === true) {
      _this.resize = (0, _lodash2.default)(_this.onResize.bind(_this), 150);
    }
    return _this;
  }
  /*
    register the throttled resize function if responsive is set to true
   */


  _createClass(Chart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.responsive === true) {
        window.addEventListener('resize', this.resize);
      }
      this.onResize();
    }
    /*
      unregister on unmount
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.responsive === true) {
        window.removeEventlistener('resize', this.resize);
      }
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      var dimension = this.chart.getBoundingClientRect();
      this.setState({
        width: dimension.width,
        height: dimension.height
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var passingProps = Object.assign({}, this.state, this.props);
      // make the chart take up the whole width and height of the parent
      var style = {
        width: '100%',
        height: '100%'
      };
      return _react2.default.createElement(
        'div',
        {
          style: style,
          ref: function ref(c) {
            _this2.chart = c;
          }
        },
        _react2.default.createElement(
          _ReactIf2.default,
          { condition: this.state.height !== null && this.state.height !== 0 },
          _react2.default.createElement(
            'svg',
            { width: '100%', height: '100%' },
            _react2.default.createElement(_Liquid2.default, passingProps)
          )
        )
      );
    }
  }]);

  return Chart;
}(_react.Component);

Chart.propTypes = {
  // enables listen to window width change and rerenders the chart
  // on resize
  responsive: _react.PropTypes.bool
};
exports.default = Chart;