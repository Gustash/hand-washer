import React from 'react'
import { View, Text } from 'react-native'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import InfoBox from '../../app/components/InfoBox'

const mockProps = props => ({
  text: '',
  style: null,
  ...props,
})

describe('<InfoBox />', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = mockProps()
    wrapper = shallow(<InfoBox {...props} />)
  })

  it('matches snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('applies text', () => {
    expect(wrapper.find(Text).prop('children')).not.toBe(true)

    wrapper.setProps({
      ...props,
      text: 'Info Box Test',
    })

    expect(wrapper.find(Text).prop('children')).toBe('Info Box Test')
  })

  it('applies style', () => {
    expect(wrapper.find(View).prop('style')).toContain(null)

    wrapper.setProps({
      ...props,
      style: {
        marginTop: 1000,
      },
    })

    expect(wrapper.find(View).prop('style')).toContainEqual({
      marginTop: 1000,
    })
  })

  it('applies hidden', () => {
    expect(wrapper.find(View).prop('style')).toContainEqual({
      opacity: 1,
    })

    wrapper.setProps({
      ...props,
      hidden: true,
    })

    expect(wrapper.find(View).prop('style')).toContainEqual({
      opacity: 0,
    })
  })
})
