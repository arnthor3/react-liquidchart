import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Liquid from '../src/Chart/Liquid';
import Shape from '../src/Chart/Shape';
import ClipPath from '../src/Chart/Clip';

describe('<Shape />', () => {
  it('should render two paths', () => {
    const wrapper = mount(
      <Shape>
        <ClipPath />
      </Shape>,
    );
    const lenPath = wrapper.find('path').length;
    expect(lenPath).toBe(4);
  });

  it('should also render two paths when it has a child', () => {
    const wrapper = mount(
      <Liquid
        width={500}
        height={500}
      >
        <Shape />
        <ClipPath />
      </Liquid>,
    );
    let lenPath = wrapper.find('path').length;
    expect(lenPath).toBe(3);
    wrapper.update();
    lenPath = wrapper.find('path').length;
    expect(lenPath).toBe(3);
  });
});