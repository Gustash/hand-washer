import React from 'react'
import { Text, SafeAreaView } from 'react-native'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import BottomBarButton from '../../app/components/BottomBarButton'
import colors from '../../app/config/colors'

const mockProps = props => ({
  onPress: jest.fn(),
  text: '',
  ...props,
})

describe('<BottomBarButton />', () => {
  let props = mockProps()
  let wrapper = shallow(<BottomBarButton {...props} />)

  it('matches BottomBarButton snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  describe('BottomBarButton applies default props', () => {
    it('defaults background color', () => {
      expect(wrapper.find(SafeAreaView).prop('style')).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: colors.lightBlue,
          }),
        ])
      )
    })

    it('defaults text color', () => {
      expect(wrapper.find(Text).prop('style')).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            color: colors.white,
          }),
        ])
      )
    })
  })

  describe('BottomBarButton applies props', () => {
    beforeAll(() => {
      props = mockProps({
        text: 'Hello World',
        style: {
          marginTop: 1000,
        },
        color: '#FFFFFF',
        textColor: '#000000',
      })
      wrapper = shallow(<BottomBarButton {...props} />)
    })

    it('renders text', () => {
      expect(
        wrapper
          .find(Text)
          .first()
          .prop('children')
      ).toBe('Hello World')
    })

    it('handles onPress', () => {
      wrapper.simulate('press')

      expect(wrapper.prop('onPress')).toHaveBeenCalledTimes(1)
    })

    it('applies style', () => {
      expect(wrapper.find(SafeAreaView).prop('style')).toContainEqual({
        marginTop: 1000,
      })
    })

    it('applies background color', () => {
      expect(wrapper.find(SafeAreaView).prop('style')).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: '#FFFFFF',
          }),
        ])
      )
    })

    it('applies text color', () => {
      expect(wrapper.find(Text).prop('style')).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            color: '#000000',
          }),
        ])
      )
    })
  })
})
