import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import SettingsRow from 'app/components/SettingsRow'
import { colors } from 'app/config'
import { actions } from 'app/state'

const Settings = () => {
  const dispatch = useDispatch()

  const storeWashes = useSelector(state => state.history.storeWashes)
  const shiftReminders = useSelector(state => state.shifts.shiftReminders)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <SettingsRow
          text="Store History"
          rightElement={
            <Switch
              value={storeWashes}
              onValueChange={() => {
                if (storeWashes) {
                  Alert.alert(
                    'Are you sure?',
                    'Disabling this option will clear your current history and the app will stop tracking history.',
                    [
                      {
                        text: 'No, take me back!',
                        style: 'cancel',
                      },
                      {
                        text: "I'm sure",
                        onPress: () => {
                          dispatch(actions.setStoreWashes(false))
                        },
                      },
                    ]
                  )
                  return
                }

                dispatch(actions.setStoreWashes(true))
              }}
            />
          }
          style={styles.row}
        />
        <SettingsRow
          text="Two Hour On Shift Reminders"
          rightElement={
            <Switch
              value={shiftReminders}
              onValueChange={() => {
                dispatch(actions.setShiftReminders(!shiftReminders))
              }}
            />
          }
          style={styles.row}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 36,
    flexGrow: 1,
  },
  row: {
    marginLeft: 13,
  },
  createdByContainer: {
    alignItems: 'center',
  },
  createdByText: {
    fontSize: 17,
    color: colors.brandedText,
  },
  image: {
    marginTop: 14,
    width: 178,
    height: 40,
  },
})

export default Settings
