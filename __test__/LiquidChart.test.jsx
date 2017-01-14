import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Liquid from '../src/Chart/LiquidChart';

describe('<Liquid />', () => {
  it('should render path', () => {
    const wrapper = mount(
      <Liquid />,
    );
  });
});
