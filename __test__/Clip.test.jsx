import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Chart from '../src/Chart/Chart';
import Clip from '../src/Chart/Clip';

describe('<Clip />', () => {
  it('should render', () => {
    const wrapper = mount(
      <Chart
        width={500}
        height={500}
      >
        <Clip />
      </Chart>);
    expect(wrapper.find('clipPath').length).toBe(1);
  });
});
