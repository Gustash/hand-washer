import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification from 'react-native-push-notification'
import configureStore from 'redux-mock-store'
import { Platform } from 'react-native'

import {
  useScheduledNotification,
  exportsForTesting,
} from '../../app/hooks/notifications'

const mockStore = configureStore([])

const { onNotification } = exportsForTesting

const ScheduleNotification = ({ onNotificationOpen }) => {
  useScheduledNotification(onNotificationOpen)

  return null
}

const App = ({ store, onNotificationOpen }) => (
  <Provider store={store}>
    <ScheduleNotification onNotificationOpen={onNotificationOpen} />
  </Provider>
)

describe('notification hooks', () => {
  describe('useScheduleNotification', () => {
    const onNotificationOpen = jest.fn()

    beforeEach(() => {
      onNotificationOpen.mockReset()
      PushNotification.cancelLocalNotifications.mockReset()
      PushNotification.localNotificationSchedule.mockReset()
      PushNotification.configure.mockReset()
      global.Date.now = jest.fn(() =>
        new Date('1990-01-01T00:00:00Z').getTime()
      )
    })

    it('should call configure on start', () => {
      const store = mockStore({
        shifts: {
          shiftActive: false,
          shiftReminders: false,
        },
      })
      mount(<App store={store} onNotificationOpen={onNotificationOpen} />)

      expect(PushNotification.configure).toHaveBeenCalledTimes(1)
    })

    it('should handle wash hands notification on ios', () => {
      jest.spyOn(Platform, 'select').mockImplementation(objs => objs.ios)

      const notification = {
        data: {
          id: '1',
        },
        finish: jest.fn(),
      }

      onNotification(notification, onNotificationOpen)

      expect(onNotificationOpen).toHaveBeenCalled()
      expect(
        PushNotification.setApplicationIconBadgeNumber
      ).toHaveBeenCalledWith(0)
      expect(notification.finish).toHaveBeenCalledWith(
        PushNotificationIOS.FetchResult.NoData
      )
    })

    it('should handle wash hands notification on android', () => {
      jest.spyOn(Platform, 'select').mockImplementation(objs => objs.android)

      const notification = {
        id: '1',
        finish: jest.fn(),
      }

      onNotification(notification, onNotificationOpen)

      expect(onNotificationOpen).toHaveBeenCalled()
      expect(
        PushNotification.setApplicationIconBadgeNumber
      ).toHaveBeenCalledWith(0)
      expect(notification.finish).toHaveBeenCalledWith(
        PushNotificationIOS.FetchResult.NoData
      )
    })

    it('should only handle wash hands notification', () => {
      jest.spyOn(Platform, 'select').mockImplementation(objs => objs.ios)

      const iosNotification = {
        data: {
          id: '2',
        },
        finish: jest.fn(),
      }

      onNotification(iosNotification, onNotificationOpen)

      jest.spyOn(Platform, 'select').mockImplementation(objs => objs.android)

      const androidNotification = {
        id: '2',
        finish: jest.fn(),
      }

      onNotification(androidNotification, onNotificationOpen)

      expect(onNotificationOpen).not.toHaveBeenCalled()
      expect(
        PushNotification.setApplicationIconBadgeNumber
      ).toHaveBeenCalledWith(0)
      expect(androidNotification.finish).toHaveBeenCalledWith(
        PushNotificationIOS.FetchResult.NoData
      )
      expect(iosNotification.finish).toHaveBeenCalledWith(
        PushNotificationIOS.FetchResult.NoData
      )
    })

    it('should call cancelLocalNotifications when shift not active', () => {
      const store = mockStore({
        shifts: {
          shiftActive: false,
          shiftReminders: true,
        },
      })
      mount(<App store={store} onNotificationOpen={onNotificationOpen} />)

      expect(PushNotification.cancelLocalNotifications).toHaveBeenCalledTimes(1)
      expect(PushNotification.cancelLocalNotifications).toHaveBeenCalledWith({
        id: '1',
      })
    })

    it('should call cancelLocalNotifications when reminders are disabled', () => {
      const store = mockStore({
        shifts: {
          shiftActive: true,
          shiftReminders: false,
        },
      })
      mount(<App store={store} onNotificationOpen={onNotificationOpen} />)

      expect(PushNotification.cancelLocalNotifications).toHaveBeenCalledTimes(1)
      expect(PushNotification.cancelLocalNotifications).toHaveBeenCalledWith({
        id: '1',
      })
    })

    it('calls localNotificationSchedule with android parameters when shifts are active and reminders enabled', () => {
      jest.spyOn(Platform, 'select').mockImplementation(objs => objs.android)

      const store = mockStore({
        shifts: {
          shiftActive: true,
          shiftReminders: true,
        },
      })
      mount(<App store={store} onNotificationOpen={onNotificationOpen} />)

      expect(PushNotification.localNotificationSchedule).toHaveBeenCalledTimes(
        1
      )
      expect(PushNotification.localNotificationSchedule).toHaveBeenCalledWith({
        id: '1',
        ticker: 'Wash your hands!',
        autoCancel: true,
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        priority: 'high',
        importance: 'high',
        allowWhileIdle: true,
        ignoreInForeground: true,
        userInfo: {
          id: '1',
        },
        title: 'Wash your hands!',
        message: "It's been 2 hours since you last washed your hands on shift.",
        number: 1,
        repeatType: 'time',
        repeatTime: 7200000,
        date: new Date(631159200000),
      })
    })

    it('calls localNotificationSchedule with ios parameters when shifts are active and reminders enabled', () => {
      jest.spyOn(Platform, 'select').mockImplementation(objs => objs.ios)

      const store = mockStore({
        shifts: {
          shiftActive: true,
          shiftReminders: true,
        },
      })
      mount(<App store={store} onNotificationOpen={onNotificationOpen} />)

      expect(PushNotification.localNotificationSchedule).toHaveBeenCalledTimes(
        1
      )
      expect(PushNotification.localNotificationSchedule).toHaveBeenCalledWith({
        id: '1',
        ticker: 'Wash your hands!',
        autoCancel: true,
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        priority: 'high',
        importance: 'high',
        allowWhileIdle: true,
        ignoreInForeground: true,
        userInfo: {
          id: '1',
        },
        title: 'Wash your hands!',
        message: "It's been 2 hours since you last washed your hands on shift.",
        number: 1,
        repeatType: 'hour',
        repeatTime: 7200000,
        date: new Date(631159200000),
      })
    })
  })
})
