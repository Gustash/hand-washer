import React from 'react'
import { Alert } from 'react-native'
import { Provider, useSelector, useDispatch } from 'react-redux'
import configureStore from 'redux-mock-store'
import TestRenderer from 'react-test-renderer'

import Settings from '../../app/screens/Settings'
import { actions } from '../../app/state'
import SettingsRow from '../../app/components/SettingsRow'

const mockStore = configureStore([])

const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('<Settings />', () => {
  let store
  let wrapper

  beforeEach(() => {
    mockDispatch.mockReset()

    store = mockStore({
      history: {
        storeWashes: true,
        washes: [],
      },
      shifts: {
        shiftActive: true,
        shiftReminders: true,
      },
    })

    useSelector.mockImplementation(selector => selector(store.getState()))
    useDispatch.mockImplementation(() => mockDispatch)

    wrapper = TestRenderer.create(
      <Provider store={store}>
        <Settings />
      </Provider>
    )
  })

  it('matches snapshot', () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it('handles toggling store history', () => {
    store = mockStore({
      history: {
        storeWashes: false,
        washes: [],
      },
      shifts: {
        shiftActive: true,
        shiftReminders: true,
      },
    })

    wrapper = TestRenderer.create(
      <Provider store={store}>
        <Settings />
      </Provider>
    )

    let row = wrapper.root
      .findAllByType(SettingsRow)
      .find(({ props }) => props.text === 'Store History')

    expect(row.props.rightElement.props.value).toBe(false)

    row.props.rightElement.props.onValueChange()

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith(actions.setStoreWashes(true))

    store = mockStore({
      history: {
        storeWashes: true,
        washes: [],
      },
      shifts: {
        shiftActive: true,
        shiftReminders: true,
      },
    })

    wrapper = TestRenderer.create(
      <Provider store={store}>
        <Settings />
      </Provider>
    )

    row = wrapper.root
      .findAllByType(SettingsRow)
      .find(({ props }) => props.text === 'Store History')

    expect(row.props.rightElement.props.value).toBe(true)

    let alertButtons
    jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
      alertButtons = buttons
    })

    row.props.rightElement.props.onValueChange()

    expect(Alert.alert).toHaveBeenCalledWith(
      'Are you sure?',
      'Disabling this option will clear your current history and the app will stop tracking history.',
      [
        {
          text: 'No, take me back!',
          style: 'cancel',
        },
        {
          text: "I'm sure",
          onPress: expect.any(Function),
        },
      ]
    )

    alertButtons[1].onPress()

    expect(mockDispatch).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenCalledWith(actions.setStoreWashes(false))
  })

  it('handles toggling shift reminders', () => {
    store = mockStore({
      history: {
        storeWashes: false,
        washes: [],
      },
      shifts: {
        shiftActive: true,
        shiftReminders: true,
      },
    })

    wrapper = TestRenderer.create(
      <Provider store={store}>
        <Settings />
      </Provider>
    )

    let row = wrapper.root
      .findAllByType(SettingsRow)
      .find(({ props }) => props.text === 'Two Hour On Shift Reminders')

    expect(row.props.rightElement.props.value).toBe(true)

    row.props.rightElement.props.onValueChange()

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith(actions.setShiftReminders(false))

    store = mockStore({
      history: {
        storeWashes: true,
        washes: [],
      },
      shifts: {
        shiftActive: true,
        shiftReminders: false,
      },
    })

    wrapper = TestRenderer.create(
      <Provider store={store}>
        <Settings />
      </Provider>
    )

    row = wrapper.root
      .findAllByType(SettingsRow)
      .find(({ props }) => props.text === 'Two Hour On Shift Reminders')

    expect(row.props.rightElement.props.value).toBe(false)

    row.props.rightElement.props.onValueChange()

    expect(mockDispatch).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenCalledWith(actions.setShiftReminders(true))
  })
})
