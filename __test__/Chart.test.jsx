import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Chart from '../src/Chart/Chart';

describe('<Chart />', () => {
  it('should call onResize on resize', () => {
    const spyOne = sinon.spy(Chart.prototype, 'onResize');
    const Test = () => (
      <span />
    );
    const Component = mount(
      <Chart
        width={300}
        height={500}
      >
        <Test />
      </Chart>,
    );

    expect(Component.find(Test).length).toBe(1);

    const Component2 = mount(
      <Chart
        responsive
      >
        <Test />
      </Chart>,
    );

    expect(Component2.find(Test).length).toBe(0);

    window.dispatchEvent(new Event('resize'));

    expect(Component2.find(Test).length).toBe(0);
    Chart.prototype.onResize.restore();
    expect(spyOne.callCount).toBe(3);
 });

});
