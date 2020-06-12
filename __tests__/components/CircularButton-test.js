import React from 'react'
import { Text, TouchableOpacity, StatusBar } from 'react-native'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import CircularButton from '../../app/components/CircularButton'

const mockProps = props => ({
  onPress: jest.fn(),
  text: '',
  icon: '',
  style: null,
  ...props,
})

describe('<CircularButton />', () => {
  let props = mockProps()
  let wrapper = shallow(<CircularButton {...props} />)

  it('matches CircularButton snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  describe('CircularButton applies default props', () => {
    it('defaults size', () => {
      expect(wrapper.find(TouchableOpacity).prop('style')).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            width: 204,
            height: 204,
            borderRadius: 102,
          }),
        ])
      )
    })
  })

  describe('CircularButton applies props', () => {
    beforeEach(() => {
      props = mockProps({
        text: 'Circular Button',
        style: {
          marginTop: 1000,
        },
        size: 64,
        icon: <StatusBar backgroundColor="#3a3a3a" />,
      })
      wrapper = shallow(<CircularButton {...props} />)
    })

    it('renders text', () => {
      expect(
        wrapper
          .find(Text)
          .first()
          .prop('children')
      ).toBe('Circular Button')
    })

    it('handles onPress', () => {
      wrapper.simulate('press')

      expect(wrapper.prop('onPress')).toHaveBeenCalledTimes(1)
    })

    it('disables Touchable without onPress', () => {
      expect(wrapper.find(TouchableOpacity).prop('disabled')).toBe(false)

      const propsWithoutOnPress = {
        ...wrapper.props(),
        onPress: null,
      }
      wrapper.setProps(propsWithoutOnPress)

      expect(wrapper.find(TouchableOpacity).prop('disabled')).toBe(true)
    })

    it('applies style', () => {
      expect(wrapper.find(TouchableOpacity).prop('style')).toContainEqual({
        marginTop: 1000,
      })
    })

    it('applies size', () => {
      expect(wrapper.find(TouchableOpacity).prop('style')).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            width: 64,
            height: 64,
            borderRadius: 32,
          }),
        ])
      )
    })

    it('renders icon', () => {
      expect(
        wrapper.containsMatchingElement(<StatusBar backgroundColor="#3a3a3a" />)
      ).toBe(true)
    })
  })
})
