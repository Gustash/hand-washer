import React from 'react'
import { Text, StatusBar, TouchableOpacity } from 'react-native'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import SettingsRow from '../../app/components/SettingsRow'
import { findNodeWithTestId } from '../../testHelpers'

const mockProps = props => ({
  text: 'Text',
  rightElement: <Text>Right Element</Text>,
  style: { marginTop: 1000 },
  onPress: jest.fn(),
  ...props,
})

describe('<SettingsRow />', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = mockProps()
    wrapper = shallow(<SettingsRow {...props} />)
  })

  it('matches snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('applies text', () => {
    expect(
      findNodeWithTestId(wrapper, 'settings-row-text').prop('children')
    ).toBe('Text')

    wrapper.setProps({
      ...props,
      text: 'Another Text',
    })

    expect(
      findNodeWithTestId(wrapper, 'settings-row-text').prop('children')
    ).toBe('Another Text')
  })

  it('applies right element', () => {
    expect(wrapper.containsMatchingElement(<Text>Right Element</Text>)).toBe(
      true
    )

    wrapper.setProps({
      ...props,
      rightElement: <StatusBar backgroundColor="#fefefe" />,
    })

    expect(
      wrapper.containsMatchingElement(<StatusBar backgroundColor="#fefefe" />)
    ).toBe(true)
  })

  it('applies style', () => {
    expect(wrapper.first().prop('style')).toContainEqual({
      marginTop: 1000,
    })

    wrapper.setProps({
      ...props,
      style: {
        marginBottom: 1000,
      },
    })

    expect(wrapper.first().prop('style')).toContainEqual({
      marginBottom: 1000,
    })
  })

  it('disables touchable without onPress', () => {
    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBe(false)

    wrapper.setProps({
      ...props,
      onPress: null,
    })

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBe(true)
  })

  it('calls onPress', () => {
    expect(props.onPress).toHaveBeenCalledTimes(0)

    wrapper.simulate('press')

    expect(props.onPress).toHaveBeenCalledTimes(1)
  })
})
