/**
 * @format
 */

import React from 'react'

import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { PersistGate } from 'redux-persist/integration/react'
import { shallow } from 'enzyme'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import App from '../app/App'
import Home from '../app/screens/Home'
import Settings from '../app/screens/Settings'
import WashTimer from '../app/screens/WashTimer'
import { colors } from '../app/config'

describe('<App />', () => {
  const wrapper = shallow(<App />)

  it('renders react-redux Provider', () => {
    expect(wrapper.find(Provider).length).toBe(1)
  })

  it('sets StatusBar background color', () => {
    expect(
      wrapper.containsMatchingElement(
        <StatusBar backgroundColor={colors.green} />
      )
    ).toBe(true)
  })

  it('renders redux-persist PersistGate', () => {
    expect(wrapper.find(PersistGate).length).toBe(1)
  })

  it('renders react-navigation NavigationContainer', () => {
    expect(wrapper.find(NavigationContainer).length).toBe(1)
  })

  describe('Navigation Setup', () => {
    const Stack = createStackNavigator()
    const stackNavigator = wrapper.find(Stack.Navigator)

    it('renders screens', () => {
      expect(
        stackNavigator.containsMatchingElement(
          <Stack.Screen name="Home" component={Home} />
        )
      ).toBe(true)
      expect(
        stackNavigator.containsMatchingElement(
          <Stack.Screen name="Timer" component={WashTimer} />
        )
      ).toBe(true)
      expect(
        stackNavigator.containsMatchingElement(
          <Stack.Screen name="Settings" component={Settings} />
        )
      ).toBe(true)
      expect(stackNavigator.children().length).toBe(3)
    })

    it('sets up screenOptions', () => {
      const { screenOptions } = stackNavigator.props()

      expect(screenOptions).toMatchObject({
        headerStyle: { backgroundColor: '#00A778' },
        headerBackImage: expect.any(Function),
        headerTitleStyle: { color: '#FFFFFF', fontSize: 17 },
        headerRightContainerStyle: { marginRight: 16 },
        headerBackTitle: 'Back',
        headerBackTitleStyle: [
          { color: '#FFFFFF', fontSize: 17 },
          { fontSize: 16 },
        ],
      })
      expect(screenOptions.headerBackImage()).toEqual(
        <FontAwesome5
          name="chevron-left"
          size={16}
          color={colors.white}
          style={{
            marginLeft: 16,
            marginRight: 4,
          }}
        />
      )
    })
  })
})
