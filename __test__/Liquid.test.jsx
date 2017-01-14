import React from 'react';
import { select } from 'd3-selection';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Liquid from '../src/Chart/Liquid';
import Shape from '../src/Chart/Shape';
import Clip from '../src/Chart/Clip';

/*
  The Liquid acts as the main controller component
  it fires off all the animations and handles the events
*/
describe('<Liquid />', () => {
  it('should render the children', () => {
    const spyOn = sinon.spy(Liquid.prototype, 'animateBackAndForth');

    const wrapper = mount(
      <Liquid
        animationTime={500}
        animationWavesTime={1500}
        liquidStyle={{ fill: '234' }}
        outerStyle={{ fill: '234' }}
        dryStyle={{}}
        wetStyle={{}}
      >
        <Clip />
        <Shape />
      </Liquid>,
    );

    expect(wrapper.find('clipPath').length).toBe(1);
    expect(wrapper.find(Shape).length).toBe(1);
    expect(spyOn.callCount).toBe(1);
    wrapper.update();

    expect(wrapper.find('clipPath').length).toBe(1);
    expect(wrapper.find(Shape).length).toBe(1);
    expect(spyOn.callCount).toBe(2);
    wrapper.unmount();

    expect(wrapper.find('clipPath').length).toBe(0);
    expect(wrapper.find(Shape).length).toBe(0);
    expect(spyOn.callCount).toBe(2);
  });

  it('should know how to do enter animation', () => {});

  it('should not animate when the ease and the time are not set', () => {
    const spyOn = sinon.spy(Liquid.prototype, 'animateValue');
    const wrapper = mount(
      <Liquid>
        <Clip />
        <Shape />
      </Liquid>,
    );

    expect(spyOn.called).toBe(false);

    wrapper.update();

    expect(spyOn.called).toBe(false);

    Liquid.prototype.animateValue.restore();
  });

  it('should call animate in backandforth', (done) => {
    const wrapper = mount(
      <Liquid
        animationTime={50}
        animationWavesTime={50}
        liquidStyle={{ fill: '234' }}
        outerStyle={{ fill: '234' }}
        dryStyle={{}}
        wetStyle={{}}
      >
        <Clip />
        <Shape />
      </Liquid>,
    );

    setTimeout(() => {
      done();
    }, 2500);

  });

  it('should animate if either ease or time is set', (done) => {
    const spy = sinon.spy(Liquid.prototype, 'animateValue')
    const wrapper = mount(
      <Liquid
        outerBound={1.2}
        animationTime={50}
        liquidStyle={{ fill: '234' }}
        outerStyle={{ fill: '234' }}
        dryStyle={{}}
        wetStyle={{}}
        waveScaleLimit={false}
      >
        <Clip />
        <Shape />
      </Liquid>,
    );
    const wrapper2 = mount(
      <Liquid
        outerBound={0.2}
        innerBound={1}
        animationEase="easeCubicInOut"
        liquidStyle={{ fill: '234' }}
        outerStyle={{ fill: '234' }}
        dryStyle={{}}
        wetStyle={{}}
      >
        <Clip />
        <Shape />
      </Liquid>,
    );

    expect(spy.callCount).toBe(2);

    setTimeout(() => {
      done();
    }, 500);

  });
});
