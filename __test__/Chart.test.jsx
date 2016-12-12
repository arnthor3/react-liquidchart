import React from 'react';
import { mount, shallow } from 'enzyme';
import Chart from '../src/Chart/index';

describe('<Chart />', () => {
  it('should recalculate width and heigth', () => {
    const Test = () => (
      <span />
    );
    const Component = mount(
      <Chart>
        <Test />
      </Chart>
    );
    expect(Component.find(Test).length).toBe(0);

    window.dispatchEvent(new Event('resize'));

    expect(Component.find(Test).length).toBe(0);

 });
});
