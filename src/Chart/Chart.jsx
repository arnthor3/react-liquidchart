import React, { Component, PropTypes } from 'react';
import throttle from 'lodash.throttle';
import ReactIf from './ReactIf';
import cloneComponents from './cloneChildren';

export default class Chart extends Component {
  static propTypes = {
    // enables listen to window width change and rerenders the chart
    // on resize
    responsive: PropTypes.bool,
    // the chart components
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null,
    };
    /*
      if user wants to rerender for all resize events then store the function
      as this.resize and throttle it so it does not refire many times during resize
    */
    if (this.props.responsive === true) {
      this.resize = throttle(this.onResize.bind(this), 150);
    }
  }
  /*
    register the throttled resize function if responsive is set to true
   */
  componentDidMount() {
    if (this.props.responsive === true) {
      window.addEventListener('resize', this.resize);
    }
    this.onResize();
  }
  /*
    unregister on unmount
   */
  componentWillUnmount() {
    if (this.props.responsive === true) {
      window.removeEventlistener('resize', this.resize);
    }
  }

  onResize() {
    const dimension = this.chart.getBoundingClientRect();
    this.setState({
      width: dimension.width,
      height: dimension.height,
    });
  }
  render() {
    let fill;

    React.Children.forEach(this.props.children, ({ props }) => {
      if (props.liquid && props.liquid.fill) {
        fill = props.liquid.fill;
      }
    });
    const { children, ...noChildren } = this.props;
    // Copy the props and the state to pass it down to the children
    const props = Object.assign({}, noChildren, {
      width: this.state.width,
      height: this.state.height,
      fill,
    });
    // clone the children and pass in the props and state
    const cloneChildrenWithProps = cloneComponents(this.props.children, props);

    // make the chart take up the whole width and height of the parent
    const style = {
      width: '100%',
      height: '100%',
    };

    return (
      <div
        style={style}
        ref={(c) => { this.chart = c; }}
      >
        <ReactIf condition={this.state.height !== null && this.state.height !== 0}>
          <svg width="100%" height="100%">
            {cloneChildrenWithProps}
          </svg>
        </ReactIf>
      </div>
    );
  }
}
