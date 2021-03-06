import { useEffect } from 'react'
import { Platform } from 'react-native'
import { useSelector } from 'react-redux'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification from 'react-native-push-notification'

const onNotification = (notification, onNotificationOpen) => {
  const { id } = Platform.select({
    ios: notification.data,
    android: notification,
  })

  // process the notification
  PushNotification.setApplicationIconBadgeNumber(0)

  if (id === '1') {
    // Wash hands notification
    onNotificationOpen()
  }

  // (required) Called when a remote is received or opened, or local notification is opened
  notification.finish(PushNotificationIOS.FetchResult.NoData)
}

/**
 * Self explanatory. Should only be used for unit testing.
 * @type {{onNotification: onNotification}}
 */
export const exportsForTesting = {
  onNotification,
}

export const useScheduledNotification = onNotificationOpen => {
  const shiftActive = useSelector(state => state.shifts.shiftActive)
  const shiftReminders = useSelector(state => state.shifts.shiftReminders)

  useEffect(() => {
    PushNotification.configure({
      onNotification: notification => {
        onNotification(notification, onNotificationOpen)
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: Platform.OS === 'ios',
    })
  }, [onNotificationOpen])

  useEffect(() => {
    if (shiftActive && shiftReminders) {
      PushNotification.localNotificationSchedule({
        /* Android Only Properties */
        id: '1', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        ticker: 'Wash your hands!', // (optional)
        autoCancel: true, // (optional) default: true
        largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
        smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
        priority: 'high', // (optional) set notification priority, default: high
        importance: 'high', // (optional) set notification importance, default: high
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        ignoreInForeground: true, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)

        /* iOS only properties */
        userInfo: {
          id: '1',
        }, // (optional) default: {} (using null throws a JSON value '<null>' error)

        /* iOS and Android properties */
        title: 'Wash your hands!', // (optional)
        message: "It's been 2 hours since you last washed your hands on shift.", // (required)
        number: 1, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        repeatType: Platform.select({
          ios: 'hour', // react-native-push-notification-ios doesn't support repeated notification at specific times, so this is the best we can do
          android: 'time',
        }), // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        repeatTime: 7200000, // 2 hours
        date: new Date(Date.now() + 7200000), // 2 hours from now
      })
    } else {
      PushNotification.cancelLocalNotifications({ id: '1' })
    }
  }, [shiftActive, shiftReminders])
}
