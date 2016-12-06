import React, {
  Component,
  PropTypes,
  Children,
  cloneElement,
} from 'react';

import throttle from 'lodash.throttle';
import ReactIf from './ReactIf';
import Liquid from './Liquid';

export default class Chart extends Component {
  static propTypes = {
    // enables listen to window width change and rerenders the chart
    // on resize
    responsive: PropTypes.bool,
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
    const passingProps = Object.assign({}, this.state, this.props);
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
            <Liquid {...passingProps} />
          </svg>
        </ReactIf>
      </div>
    );
  }
}
