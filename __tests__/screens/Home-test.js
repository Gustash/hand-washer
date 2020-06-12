import React from 'react'
import { Text, FlatList, TouchableOpacity } from 'react-native'
import { Provider, useDispatch, useSelector } from 'react-redux'
import configureStore from 'redux-mock-store'
import TestRenderer from 'react-test-renderer'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import Home from '../../app/screens/Home'
import CircularButton from '../../app/components/CircularButton'
import BottomBarButton from '../../app/components/BottomBarButton'
import { useScheduledNotification } from '../../app/hooks/notifications'
import { actions } from '../../app/state'
import InfoBox from '../../app/components/InfoBox'

const mockStore = configureStore([])

const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

jest.mock('app/hooks/notifications', () => ({
  ...jest.requireActual('app/hooks/notifications'),
  useScheduledNotification: jest.fn(),
}))

describe('<Home />', () => {
  let store
  let wrapper
  let currentOptions

  const renderWithProvider = () =>
    TestRenderer.create(
      <Provider store={store}>
        <Home
          navigation={{
            navigate: jest.fn(),
            setOptions: jest.fn(options => {
              currentOptions = options
            }),
          }}
        />
      </Provider>
    )

  beforeEach(() => {
    mockDispatch.mockReset()
    useScheduledNotification.mockReset()

    currentOptions = {}
    store = mockStore({
      history: {
        storeWashes: true,
        washes: [
          { id: 1, date: '01-01-1990 00:00' },
          { id: 2, date: '02-01-1990 01:00' },
          { id: 3, date: '01-01-1990 23:00' },
        ],
      },
      shifts: {
        shiftActive: false,
        shiftReminders: false,
      },
    })

    useSelector.mockImplementation(selector => selector(store.getState()))
    useDispatch.mockImplementation(() => mockDispatch)

    TestRenderer.act(() => {
      wrapper = renderWithProvider(store)
    })
  })

  it('matches snapshot', () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it('creates right header icon', () => {
    expect(
      wrapper.root.findByType(Home).props.navigation.setOptions
    ).toHaveBeenCalledTimes(1)
    expect(currentOptions.headerRight()).toEqual(
      <TouchableOpacity onPress={expect.any(Function)}>
        <FontAwesome5 name="cog" size={21} color="#FFFFFF" />
      </TouchableOpacity>
    )
  })

  it('navigates to Timer on notification open', () => {
    useScheduledNotification.mockReset()
    // Instantly call callback to mock the user opening a notification on the device
    useScheduledNotification.mockImplementation(cb => cb())

    TestRenderer.act(() => {
      wrapper = renderWithProvider(store)
    })

    expect(useScheduledNotification).toHaveBeenCalledTimes(1)

    expect(
      wrapper.root.findByType(Home).props.navigation.navigate
    ).toHaveBeenCalledWith('Timer')
  })

  it('sorts data by date descending', () => {
    const expectedData = [
      { id: 2, date: '02-01-1990 01:00' },
      { id: 3, date: '01-01-1990 23:00' },
      { id: 1, date: '01-01-1990 00:00' },
    ]

    expect(wrapper.root.findByType(FlatList).props.data).toEqual(expectedData)
  })

  it('navigates to Settings when header right icon is pressed', () => {
    const headerRight = TestRenderer.create(currentOptions.headerRight())

    headerRight.root.findByType(TouchableOpacity).props.onPress()

    const { navigate } = wrapper.root.findByType(Home).props.navigation

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('Settings')
  })

  it('should navigate to Timer when CircleButton is pressed', () => {
    wrapper.root.findByType(CircularButton).props.onPress()

    const { navigate } = wrapper.root.findByType(Home).props.navigation

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('Timer')
  })

  it('should enable shift active when BottomBarButton is pressed', () => {
    store = mockStore({
      history: {
        storeWashes: true,
        washes: [],
      },
      shifts: {
        shiftActive: false,
        shiftReminders: false,
      },
    })

    wrapper = renderWithProvider()

    const bottomBarButton = wrapper.root.findByType(BottomBarButton)
    const { onPress } = bottomBarButton.props

    onPress()

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith(actions.setShiftActive(true))
  })

  it('should disable shift active when BottomBarButton is pressed', () => {
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

    wrapper = renderWithProvider()

    const bottomBarButton = wrapper.root.findByType(BottomBarButton)
    const { onPress } = bottomBarButton.props

    onPress()

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith(actions.setShiftActive(false))
  })

  it('extracts keys from data', () => {
    const flatList = wrapper.root.findByType(FlatList)

    expect(
      flatList.props.keyExtractor({ id: 1, date: '01-01-1990 00:00' })
    ).toBe('log_1')
  })

  it('hides info box when not on shift', () => {
    store = mockStore({
      history: {
        storeWashes: true,
        washes: [],
      },
      shifts: {
        shiftActive: false,
        shiftReminders: false,
      },
    })

    wrapper = renderWithProvider()

    expect(wrapper.root.findByType(InfoBox).props.hidden).toBeTruthy()
  })

  it('shows info box when on shift', () => {
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

    wrapper = renderWithProvider()

    expect(wrapper.root.findByType(InfoBox).props.hidden).toBeFalsy()
  })

  it('warns about receiving reminders', () => {
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

    wrapper = renderWithProvider()

    const expectedText = 'Currently on shift and receiving reminders'

    expect(wrapper.root.findByType(InfoBox).props.text).toEqual(expectedText)
  })

  it('warns about not receiving reminders', () => {
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

    wrapper = renderWithProvider()

    const expectedText = 'Currently on shift with reminders disabled'

    expect(wrapper.root.findByType(InfoBox).props.text).toEqual(expectedText)
  })

  it('renders history subheader when there are washes', () => {
    store = mockStore({
      history: {
        storeWashes: true,
        washes: [{ id: 1, date: '01-01-1990 00:00' }],
      },
      shifts: {
        shiftActive: true,
        shiftReminders: false,
      },
    })

    wrapper = renderWithProvider()

    const subheader = wrapper.root
      .findAllByType(Text)
      .find(({ props }) => props.testId === 'home-history-subheader')

    expect(subheader).toBeDefined()
  })

  it('hides history subheader when there are no washes', () => {
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

    wrapper = renderWithProvider()

    const subheader = wrapper.root
      .findAllByType(Text)
      .find(({ props }) => props.testId === 'home-history-subheader')

    expect(subheader).not.toBeDefined()
  })

  it('renders start shift button', () => {
    store = mockStore({
      history: {
        storeWashes: true,
        washes: [],
      },
      shifts: {
        shiftActive: false,
        shiftReminders: false,
      },
    })

    wrapper = renderWithProvider()

    expect(wrapper.root.findByType(BottomBarButton).props).toMatchObject({
      text: 'Start Shift',
      color: '#00A778',
      onPress: expect.any(Function),
    })
  })

  it('renders end shift button', () => {
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

    wrapper = renderWithProvider()

    expect(wrapper.root.findByType(BottomBarButton).props).toMatchObject({
      text: 'End Shift',
      color: '#00A1D2',
      onPress: expect.any(Function),
    })
  })
})
