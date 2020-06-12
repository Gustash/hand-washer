import React from 'react'
import { Provider, useDispatch } from 'react-redux'
import configureStore from 'redux-mock-store'
import TestRenderer from 'react-test-renderer'

import WashTimer from '../../app/screens/WashTimer'
import { actions } from '../../app/state'
import Row from '../../app/components/Row'

const mockStore = configureStore([])

const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('<WashTimer />', () => {
  let store
  let wrapper

  beforeEach(() => {
    mockDispatch.mockReset()

    global.Date.now = jest.fn(() => new Date('1990-01-01T00:00:00Z').getTime())

    store = mockStore({
      history: {
        storeWashes: true,
        washes: [],
      },
    })

    useDispatch.mockImplementation(() => mockDispatch)

    wrapper = TestRenderer.create(
      <Provider store={store}>
        <WashTimer />
      </Provider>
    )
  })

  it('matches snapshot', () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it('logs wash when timer finishes', () => {
    const timer = wrapper.root.findByProps({
      testId: 'wash-timer-timer',
    })
    timer.props.onTimerFinished()
    expect(mockDispatch).toHaveBeenCalledWith(
      actions.logWash({ date: '01-01-1990 00:00' })
    )
  })
})
