import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Liquid from '../src/Chart/Liquid';
import Shape from '../src/Chart/Shape';
import Text from '../src/Chart/Text';


describe('<Text />', () => {
  it('should render when cloned', () => {
    const wrapper = mount(
      <Shape showDecimal>
        <Text />
      </Shape>,
    );
    expect(wrapper.find('text').length).toBe(4);
    expect(wrapper.find('tspan').length).toBe(6);
  });
});