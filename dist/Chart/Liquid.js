'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Timer = require('d3-timer');

var _d3Shape = require('d3-shape');

var _d3Ease = require('d3-ease');

var ease = _interopRequireWildcard(_d3Ease);

var _d3Selection = require('d3-selection');

var _d3Scale = require('d3-scale');

var _d3Interpolate = require('d3-interpolate');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  PropType for fill and stroke..
 */
var fillStroke = _react.PropTypes.shape({
  fill: _react.PropTypes.string,
  stroke: _react.PropTypes.string
});

var LiquidChart = function (_Component) {
  _inherits(LiquidChart, _Component);

  function LiquidChart() {
    _classCallCheck(this, LiquidChart);

    return _possibleConstructorReturn(this, (LiquidChart.__proto__ || Object.getPrototypeOf(LiquidChart)).apply(this, arguments));
  }

  _createClass(LiquidChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.animate) {
        this.animate();
        return;
      }
      this.draw();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.animate) {
        this.animate();
        return;
      }
      this.draw();
    }
  }, {
    key: 'setRes',
    value: function setRes() {
      this.arr = new Array(100);
      this.wave = (0, _d3Selection.select)(this.clipPath).datum([this.props.value]);
      this.text = (0, _d3Selection.select)(this.container).selectAll('text').selectAll('tspan.value');
      var width = this.props.width * this.props.innerRadius / 2;
      var height = this.props.height * (this.props.innerRadius - this.props.margin) / 2;

      this.x = (0, _d3Scale.scaleLinear)().range([-this.liquidRadius * 2, this.liquidRadius * 2]).domain([0, 100]);
      this.y = (0, _d3Scale.scaleLinear)().range([height, -height]).domain([0, 100]);
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this2 = this;

      this.setRes();

      var val = (0, _d3Shape.area)().x(function (d, i) {
        return _this2.x(i);
      }).y0(function (d, i) {
        return _this2.y(_this2.props.amplitude * Math.sin(i / _this2.props.frequency) + _this2.props.value);
      }).y1(function (d) {
        return _this2.props.height / 2;
      });
      this.wave.attr('d', val(this.arr));
      this.text.text(Math.round(this.props.value));
    }
  }, {
    key: 'animate',
    value: function animate() {
      var _this3 = this;

      this.setRes();
      var val = (0, _d3Shape.area)().x(function (d, i) {
        return _this3.x(i);
      }).y0(function (d, i) {
        return _this3.y(Math.sin(i / 4));
      }).y1(function (d) {
        return _this3.props.height / 2;
      });

      var time = (0, _d3Scale.scaleLinear)().range([0, 1]).domain([0, this.props.animationTime]);
      var interpolateValue = (0, _d3Interpolate.interpolate)(this.wave.node().old || 0, this.props.value);
      var interpolateWave = (0, _d3Interpolate.interpolate)(0, this.liquidRadius);
      var animationTimer = (0, _d3Timer.timer)(function (t) {
        var animate = _this3.props.ease(time(t));
        var animateWave = ease.easeSinInOut(time(t));

        val.y0(function (d, i) {
          return _this3.y(_this3.props.amplitude * Math.sin(i / _this3.props.frequency) + interpolateValue(animate));
        });

        _this3.text.text(Math.round(interpolateValue(animate)));

        _this3.wave.attr('d', val(_this3.arr));
        _this3.wave.attr('transform', 'translate(' + interpolateWave(animateWave) + ',0)');
        // the transition has ended
        if (t >= _this3.props.animationTime) {
          // make sure that the chart ends in the right position
          animationTimer.stop();
          _this3.text.text(Math.round(interpolateValue(animate)));
          _this3.wave.attr('d', val(_this3.arr));
          _this3.wave.attr('transform', 'translate(' + interpolateWave(1) + ',0)');
          _this3.text.text(Math.round(_this3.props.value));
          // if the onEnd prop is set then call the function
          if (_this3.props.onEnd !== undefined) {
            _this3.props.onEnd();
          }
        }
      });
      // Store the old node value so that we can animate from
      // that point
      this.wave.node().old = this.props.value;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      this.radius = Math.min(this.props.height / 2, this.props.width / 2);
      this.liquidRadius = this.radius * (this.props.innerRadius - this.props.margin);
      // set the outerArc arc parameters
      var outerArc = (0, _d3Shape.arc)().outerRadius(this.props.outerRadius * this.radius).innerRadius(this.props.innerRadius * this.radius).startAngle(0).endAngle(Math.PI * 2);
      var cX = this.props.width * this.props.offsetX / 2;
      var cY = this.props.height * this.props.offsetY / 2;

      return _react2.default.createElement(
        'g',
        {
          transform: 'translate(' + cX + ',' + cY + ')',
          ref: function ref(c) {
            _this4.container = c;
          }
        },
        _react2.default.createElement(
          'defs',
          null,
          _react2.default.createElement(
            'clipPath',
            {
              id: 'clip'
            },
            _react2.default.createElement('path', {
              ref: function ref(c) {
                _this4.clipPath = c;
              }
            })
          )
        ),
        _react2.default.createElement(
          'text',
          {
            textAnchor: 'middle',
            fontSize: this.props.fontSize,
            fill: this.props.number.fill,
            stroke: this.props.number.stroke
          },
          _react2.default.createElement(
            'tspan',
            { className: 'value' },
            this.props.value
          ),
          _react2.default.createElement(
            'tspan',
            { fontSize: this.props.smallFontSize },
            '%'
          )
        ),
        _react2.default.createElement(
          'g',
          {
            clipPath: 'url(#clip)'
          },
          _react2.default.createElement('circle', {
            r: this.liquidRadius,
            fill: this.props.liquid.fill
          }),
          _react2.default.createElement(
            'text',
            {
              textAnchor: 'middle',
              fontSize: this.props.fontSize,
              fill: this.props.liquidNumber.fill,
              stroke: this.props.liquidNumber.stroke
            },
            _react2.default.createElement(
              'tspan',
              { className: 'value' },
              this.props.value
            ),
            _react2.default.createElement(
              'tspan',
              { fontSize: this.props.smallFontSize },
              '%'
            )
          )
        ),
        _react2.default.createElement('path', {
          d: outerArc(),
          fill: this.props.outerArcStyle.fill,
          stroke: this.props.outerArcStyle.stroke
        }),
        _react2.default.createElement('circle', {
          r: this.radius,
          fill: 'rgba(0,0,0,0)',
          stroke: 'rgba(0,0,0,0)',
          style: { pointerEvents: 'all' },
          onClick: function onClick() {
            _this4.props.onClick();
          }
        })
      );
    }
  }]);

  return LiquidChart;
}(_react.Component);

LiquidChart.propTypes = {
  // a percentage from 0 to 100
  value: _react.PropTypes.number,
  // boolean if true then animate
  animate: _react.PropTypes.bool,
  // comes from Chart parent
  width: _react.PropTypes.number,
  // comes from Chart parent
  height: _react.PropTypes.number,
  // innerRadius
  innerRadius: _react.PropTypes.number,
  // outer radius
  outerRadius: _react.PropTypes.number,
  // margin between inner liquid and innerRadius
  margin: _react.PropTypes.number,
  // callback function called when animation is done
  onEnd: _react.PropTypes.func,
  // d3 easing functions
  ease: _react.PropTypes.func,
  // animation Time
  animationTime: _react.PropTypes.number,
  // The fill and stroke for the outer arc
  outerArcStyle: fillStroke,
  // The fill and stroke for the liquid
  liquid: fillStroke,
  // The fill and stroke for the number part that
  // is drenched in liquid
  liquidNumber: fillStroke,
  // the fill and stroke of the number that is not drenched in liquid
  number: fillStroke,
  // the wave amplitude
  amplitude: _react.PropTypes.number,
  // the wave frequncy inverse, the higer the number the fewer the waves
  frequency: _react.PropTypes.number,
  // on click
  onClick: _react.PropTypes.func,
  offsetY: _react.PropTypes.number,
  offsetX: _react.PropTypes.number,
  // Font size for the number
  fontSize: _react.PropTypes.string,
  // font size for the percentage
  smallFontSize: _react.PropTypes.string,
  animateWaves: _react.PropTypes.bool
};
LiquidChart.defaultProps = {
  value: 65,
  animate: false,
  outerRadius: 0.9,
  innerRadius: 0.8,
  margin: 0.025,
  ease: ease.easeCubicInOut,
  animationTime: 2000,
  amplitude: 2,
  frequency: 4,
  outerArcStyle: {
    fill: 'rgb(23, 139, 202)'
  },
  liquid: {
    fill: 'rgb(23, 139, 202)'
  },
  liquidNumber: {
    fill: 'rgb(164, 219, 248)'
  },
  number: {
    fill: 'rgb(4, 86, 129)'
  },
  offsetX: 1,
  offsetY: 1,
  onClick: function onClick() {},
  fontSize: '7rem',
  smallFontSize: '3rem'
};
exports.default = LiquidChart;