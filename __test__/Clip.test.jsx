import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Clip from '../src/Chart/Clip';

describe('<Clip />', () => {
  it('should render', () => {
    const wrapper = mount(
      <Clip />
    );
    expect(wrapper.find('clipPath').length).toBe(1);
  });
});
