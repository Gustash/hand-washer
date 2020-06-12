import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import HandsWashIcon from '../../app/components/HandsWashIcon'

const mockProps = props => ({
  color: '#FFFFFF',
  size: 32,
  ...props,
})

describe('<HandWashIcon />', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = mockProps()
    wrapper = shallow(<HandsWashIcon {...props} />)
  })

  it('matches snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('applies size', () => {
    expect(wrapper.find(Svg).props()).toMatchObject({
      width: 32,
      height: 32,
    })

    const newProps = {
      ...props,
      size: 64,
    }
    wrapper.setProps(newProps)

    expect(wrapper.find(Svg).props()).toMatchObject({
      width: 64,
      height: 64,
    })
  })

  it('applies color', () => {
    expect(wrapper.find(Path).prop('fill')).toBe('#FFFFFF')

    const newProps = {
      ...props,
      color: '#000000',
    }
    wrapper.setProps(newProps)

    expect(wrapper.find(Path).prop('fill')).toBe('#000000')
  })
})
