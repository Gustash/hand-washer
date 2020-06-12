import React from 'react'
import Animated from 'react-native-reanimated'
import { Circle } from 'react-native-svg'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import CircleProgress from '../../app/components/CircleProgress'

const { Value } = Animated
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const mockProps = props => ({
  size: 24,
  strokeWidth: 4,
  progress: new Value(0),
  ...props,
})

describe('<CircleProgress />', () => {
  const testProps = mockProps({
    size: 64,
    strokeWidth: 9,
    progress: new Value(0.5),
  })
  let initialProps
  let wrapper

  beforeEach(() => {
    initialProps = mockProps()
    wrapper = shallow(<CircleProgress {...initialProps} />)
  })

  it('matches CircleProgress snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('calculates radius', () => {
    expect(wrapper.find(AnimatedCircle).prop('r')).toBe(10)
    wrapper.setProps(testProps)
    expect(wrapper.find(AnimatedCircle).prop('r')).toBe(27.5)
  })

  it('calculates cx', () => {
    expect(wrapper.find(AnimatedCircle).prop('cx')).toBe(12)
    wrapper.setProps(testProps)
    expect(wrapper.find(AnimatedCircle).prop('cx')).toBe(32)
  })

  it('calculates cy', () => {
    expect(wrapper.find(AnimatedCircle).prop('cy')).toBe(12)
    wrapper.setProps(testProps)
    expect(wrapper.find(AnimatedCircle).prop('cy')).toBe(32)
  })

  it('calculates circumference', () => {
    expect(wrapper.find(AnimatedCircle).prop('strokeDasharray')).toBe(
      '62.83185307179586, 62.83185307179586'
    )
    wrapper.setProps(testProps)
    expect(wrapper.find(AnimatedCircle).prop('strokeDasharray')).toBe(
      '172.78759594743863, 172.78759594743863'
    )
  })
})
