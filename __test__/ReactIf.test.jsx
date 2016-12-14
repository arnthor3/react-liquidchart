import React from 'react';
import { mount, shallow } from 'enzyme';
import ReactIf from '../src/Chart/ReactIf';

describe('<ReactIf />', () => {
  it('sould render children if true', () => {
    const el = mount(
      <ReactIf condition>
        <h1>Hello</h1>
      </ReactIf>,
    );

    const nonEl = mount(
      <ReactIf>
        <h1>Hello</h1>
      </ReactIf>,
    );
    // should render
    expect(el.find('h1').length).toBe(1);
    expect(el.find('span').length).toBe(1);
    // should not render
    expect(nonEl.find('h1').length).toBe(0);
    expect(nonEl.find('span').length).toBe(0);
  });

  it('should let you select parent element', () => {
    const el = mount(
      <ReactIf condition el={<div />}>
        <h1>Hello</h1>
      </ReactIf>,
    );
    // sould render a div as parent not a span
    expect(el.find('h1').length).toBe(1);
    expect(el.find('span').length).toBe(0);
    expect(el.find('div').length).toBe(1);
  });
});