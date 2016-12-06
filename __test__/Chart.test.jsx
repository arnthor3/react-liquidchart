import React from 'react';
import { mount, shallow } from 'enzyme';
import Chart from '../src/Components/Chart';

describe('<Chart />', () => {
  it('should pass width and heigth to components not native dom', () => {
    const Rect = () => (
      <g>
        <rect />
      </g>

    );
    const el = mount(
      <Chart>
        <Rect />
        <text>Hello</text>
      </Chart>,
    );
    expect(el.find(Rect).props().width).toBeDefined();
    expect(el.find('text').props().width).not.toBeDefined();
  });
});
