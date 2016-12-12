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

var _d3Color = require('d3-color');

var d3Color = _interopRequireWildcard(_d3Color);

require('d3-transition');

var _ReactIf = require('./ReactIf');

var _ReactIf2 = _interopRequireDefault(_ReactIf);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

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
      // set an array filled with zeros,
      // we are just going to use the index anyways
      this.arr = new Array(100);
      // get the clip path
      this.wave = (0, _d3Selection.select)(this.clipPath).datum([this.props.value]);
      // get the tspan
      this.text = (0, _d3Selection.select)(this.container).selectAll('text').selectAll('tspan.value');

      var height = this.props.height * (this.props.innerRadius - this.props.margin) / 2;
      // to animate the wave we need to set the width of the path double the diameter
      // of the liquid.
      this.x = (0, _d3Scale.scaleLinear)().range([-this.liquidRadius * 2, this.liquidRadius * 2]).domain([0, 100]);
      this.y = (0, _d3Scale.scaleLinear)().range([height, -height]).domain([0, 100]);
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this2 = this;

      // ready the chart
      this.setRes();
      // some basic trig
      var val = (0, _d3Shape.area)().x(function (d, i) {
        return _this2.x(i);
      }).y0(function (d, i) {
        return _this2.y(_this2.props.amplitude * Math.sin(i / _this2.props.frequency) + _this2.props.value);
      }).y1(function (d) {
        return _this2.props.height / 2;
      });
      // set the clip path d attribute
      this.wave.attr('d', val(this.arr));
      // set the text to the rounded value
      // decimal formatting todo
      this.text.text(Math.round(this.props.value));
    }
  }, {
    key: 'animate',
    value: function animate() {
      var _this3 = this;

      // ready the chart and do calculations
      this.setRes();
      var val = (0, _d3Shape.area)().x(function (d, i) {
        return _this3.x(i);
      }).y1(function (d) {
        return _this3.props.height / 2;
      });
      // reduce the wave when it's close to 0 or 100
      var waveScale = void 0;
      if (this.props.waveScaleLimit) {
        waveScale = (0, _d3Scale.scaleLinear)().range([0, this.props.amplitude, 0]).domain([0, 50, 100]);
      } else {
        waveScale = (0, _d3Scale.scaleLinear)().range([this.props.amplitude, this.props.amplitude]).domain([0, 50, 100]);
      }

      if (this.props.animateWaves) {
        this.animateWave();
      }
      // the d3 timer goes from from 0 to 1
      var time = (0, _d3Scale.scaleLinear)().range([0, 1]).domain([0, this.props.animationTime]);
      // if the wave does not have old value then interpolate from 0 to value else old to value
      var interpolateValue = (0, _d3Interpolate.interpolate)(this.wave.node().old || 0, this.props.value);

      // start animation
      var animationTimer = (0, _d3Timer.timer)(function (t) {
        // set the easing
        var animate = _this3.props.ease(time(t));
        var value = interpolateValue(animate);
        // calculate the wave
        val.y0(function (d, i) {
          return _this3.y(waveScale(value) * Math.sin(i / _this3.props.frequency) + value);
        });
        // set the text value
        _this3.text.text(Math.round(value));
        // set the wave data attribute
        _this3.wave.attr('d', val(_this3.arr));
        // the transition has ended
        if (t >= _this3.props.animationTime) {
          // stop the timer
          animationTimer.stop();
          // Make sure that the animation stops in the right place
          // we set 1 as the interpolation parameter
          val.y0(function (d, i) {
            return _this3.y(waveScale(_this3.props.value) * Math.sin(i / _this3.props.frequency) + interpolateValue(1));
          });
          _this3.text.text(Math.round(interpolateValue(1)));
          _this3.wave.attr('d', val(_this3.arr));
          // if the onEnd prop is set then call the function
          if (_this3.props.onEnd !== undefined) {
            _this3.props.onEnd();
          }
        }
      });
      // Store the old node value so that we can animate from
      // that point again
      this.wave.node().old = this.props.value;
    }
    // animate the wave from 0 to liquidRadius repeat
    // not perfect..

  }, {
    key: 'animateWave',
    value: function animateWave() {
      var _this4 = this;

      this.wave.attr('transform', 'translate(0,0)').transition().duration(2000).ease(ease.easeLinear).attr('transform', 'translate(' + this.liquidRadius + ',0)').on('end', function () {
        _this4.animateWave();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      this.radius = Math.min(this.props.height / 2, this.props.width / 2);
      this.liquidRadius = this.radius * (this.props.innerRadius - this.props.margin);
      // set the outerArc arc parameters
      var outerArc = (0, _d3Shape.arc)().outerRadius(this.props.outerRadius * this.radius).innerRadius(this.props.innerRadius * this.radius).startAngle(0).endAngle(Math.PI * 2);
      // set the chart center
      var cX = this.props.width / 2;
      var cY = this.props.height / 2;

      var fillCircle = this.props.liquid.fill;

      if (this.props.gradient) {
        fillCircle = 'url(#' + this.props.gradient + ')';
      }
      return _react2.default.createElement(
        'g',
        {
          transform: 'translate(' + cX + ',' + cY + ')',
          ref: function ref(c) {
            _this5.container = c;
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
                _this5.clipPath = c;
              }
            })
          )
        ),
        (0, _Text2.default)(this.props, this.props.number),
        _react2.default.createElement(
          'g',
          { clipPath: 'url(#clip)' },
          _react2.default.createElement('circle', {
            r: this.liquidRadius,
            fill: fillCircle
          }),
          (0, _Text2.default)(this.props, this.props.liquidNumber)
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
            _this5.props.onClick();
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
  // scaling the wave when it´s close to 0 or 100
  waveScaleLimit: _react.PropTypes.bool,
  // on click
  onClick: _react.PropTypes.func,
  // if true then animate waves
  animateWaves: _react.PropTypes.bool,
  // the gradient string
  gradient: _react.PropTypes.string
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
  waveScaleLimit: true,
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